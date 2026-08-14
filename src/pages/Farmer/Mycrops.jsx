import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Sprout,
  Bell,
  User,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Eye,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/Components/Ui/Button";
import {
  Card,
  CardContent,
} from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";

import { supabase } from "@/Lib/supabase.js";


const BUCKET_NAME = "crop-images";


/* =========================================================
   MY CROPS COMPONENT
========================================================= */

const MyCrops = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [crops, setCrops] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");


  /* =======================================================
     GET CURRENT USER
  ======================================================= */

  const getCurrentUser = async () => {
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (!currentUser) {
      navigate("/login");
      return null;
    }

    setUser(currentUser);

    return currentUser;
  };


  /* =======================================================
     IMAGE URL HELPER
  ======================================================= */

  const getImagePath = (crop) => {
    return (
      crop.image_path ||
      crop.image ||
      crop.photo_path ||
      crop.photo ||
      crop.image_url ||
      crop.photo_url ||
      null
    );
  };


  /* =======================================================
     CREATE IMAGE URL
     
     Supports:
     1. Full URL
     2. Supabase storage path
     
     Private bucket -> signed URL
  ======================================================= */

  const getCropImageUrl = async (crop) => {
    const imagePath = getImagePath(crop);

    if (!imagePath) {
      return null;
    }

    // If database already contains a complete URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    // If database contains only Storage path
    const {
      data,
      error,
    } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(imagePath, 60 * 60);

    if (error) {
      console.error(
        "Image signed URL error:",
        error
      );

      return null;
    }

    return data?.signedUrl || null;
  };


  /* =======================================================
     ADD IMAGE URL TO CROPS
  ======================================================= */

  const prepareCrops = async (cropData) => {
    const prepared = await Promise.all(
      (cropData || []).map(async (crop) => {
        const imageUrl = await getCropImageUrl(crop);

        return {
          ...crop,
          imageUrl,
        };
      })
    );

    return prepared;
  };


  /* =======================================================
     LOAD CROPS
  ======================================================= */

  const loadCrops = async (currentUser = user) => {
    try {
      if (!currentUser) {
        return;
      }

      setError("");

      const {
        data,
        error: cropError,
      } = await supabase
        .from("crops")
        .select("*")
        .eq("farmer_id", currentUser.id)
        .order("created_at", {
          ascending: false,
        });

      if (cropError) {
        throw cropError;
      }

      const preparedCrops = await prepareCrops(data);

      setCrops(preparedCrops);

    } catch (err) {
      console.error(
        "Load crops error:",
        err
      );

      setError(
        err.message ||
        "Crops load nahi ho payi."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    let channel;

    const initialize = async () => {
      try {
        setLoading(true);

        const currentUser =
          await getCurrentUser();

        if (!currentUser) {
          return;
        }

        await loadCrops(currentUser);


        /* ================================================
           REALTIME CROPS
           
           INSERT
           UPDATE
           DELETE
        ================================================= */

        channel = supabase
          .channel(
            `farmer-crops-${currentUser.id}`
          )
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "crops",
              filter: `farmer_id=eq.${currentUser.id}`,
            },
            async () => {

              // Whenever crop changes,
              // reload the list and images
              await loadCrops(currentUser);
            }
          )
          .subscribe((status) => {
            console.log(
              "Crops realtime status:",
              status
            );
          });

      } catch (err) {
        console.error(
          "My Crops initialization error:",
          err
        );

        setError(
          err.message ||
          "Something went wrong."
        );

        setLoading(false);
      }
    };


    initialize();


    /* ====================================================
       CLEANUP REALTIME CHANNEL
    ==================================================== */

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };

  }, []);


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    const {
      error: logoutError,
    } = await supabase.auth.signOut();

    if (logoutError) {
      console.error(
        "Logout error:",
        logoutError
      );

      return;
    }

    navigate("/login");
  };


  /* =======================================================
     DELETE CROP
  ======================================================= */

  const handleDelete = async (crop) => {

    const confirmed = window.confirm(
      `Kya aap "${getCropName(crop)}" ko delete karna chahte hain?`
    );

    if (!confirmed) {
      return;
    }


    try {

      setDeletingId(crop.id);
      setError("");


      /* -----------------------------------------------
         DELETE DATABASE ROW
      ------------------------------------------------ */

      const {
        error: deleteError,
      } = await supabase
        .from("crops")
        .delete()
        .eq("id", crop.id)
        .eq("farmer_id", user.id);


      if (deleteError) {
        throw deleteError;
      }


      /* -----------------------------------------------
         DELETE IMAGE FROM STORAGE
         
         Only if image_path exists
         and it is not a complete URL
      ------------------------------------------------ */

      const imagePath =
        getImagePath(crop);

      if (
        imagePath &&
        !imagePath.startsWith("http://") &&
        !imagePath.startsWith("https://")
      ) {

        const {
          error: storageError,
        } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([imagePath]);


        if (storageError) {
          console.warn(
            "Storage image delete warning:",
            storageError
          );
        }
      }


      // Realtime normally updates this automatically.
      // We also update UI immediately.
      setCrops((previous) =>
        previous.filter(
          (item) => item.id !== crop.id
        )
      );


    } catch (err) {

      console.error(
        "Delete crop error:",
        err
      );

      setError(
        err.message ||
        "Crop delete nahi ho payi."
      );

    } finally {

      setDeletingId(null);
    }
  };


  /* =======================================================
     CROP NAME
  ======================================================= */

  const getCropName = (crop) => {
    return (
      crop.crop_name ||
      crop.name ||
      crop.crop ||
      crop.title ||
      "Unknown Crop"
    );
  };


  /* =======================================================
     CROP EMOJI
  ======================================================= */

  const getCropEmoji = (crop) => {

    const name =
      getCropName(crop)
        .toLowerCase();


    if (
      name.includes("gehun") ||
      name.includes("wheat")
    ) {
      return "🌾";
    }

    if (
      name.includes("tamatar") ||
      name.includes("tomato")
    ) {
      return "🍅";
    }

    if (
      name.includes("aaloo") ||
      name.includes("potato")
    ) {
      return "🥔";
    }

    if (
      name.includes("pyaaz") ||
      name.includes("onion")
    ) {
      return "🧅";
    }

    if (
      name.includes("dhaniya") ||
      name.includes("coriander")
    ) {
      return "🌿";
    }

    if (
      name.includes("mirch") ||
      name.includes("chilli")
    ) {
      return "🌶️";
    }

    if (
      name.includes("seb") ||
      name.includes("apple")
    ) {
      return "🍎";
    }

    if (
      name.includes("kela") ||
      name.includes("banana")
    ) {
      return "🍌";
    }

    if (
      name.includes("gobhi") ||
      name.includes("cauliflower")
    ) {
      return "🥦";
    }

    return "🌱";
  };


  /* =======================================================
     QUANTITY
  ======================================================= */

  const getQuantity = (crop) => {

    const quantity =
      crop.quantity ??
      crop.qty ??
      "-";

    const unit =
      crop.unit
        ? ` ${crop.unit}`
        : "";

    return `${quantity}${unit}`;
  };


  /* =======================================================
     PRICE
  ======================================================= */

  const getPrice = (crop) => {

    const price =
      crop.price ??
      crop.crop_price ??
      crop.selling_price;

    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return "Price not set";
    }

    return `₹${Number(price).toLocaleString(
      "en-IN"
    )}`;
  };


  /* =======================================================
     STATUS
  ======================================================= */

  const getStatus = (crop) => {
    return crop.status || "active";
  };


  const statusConfig = {

    active: {
      label: "Active ✅",
      variant: "default",
    },

    sold: {
      label: "Bik Gaya 💰",
      variant: "secondary",
    },

    pending: {
      label: "Pending ⏳",
      variant: "outline",
    },

  };


  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (loading) {

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">

        <div className="text-center">

          <Loader2
            className="h-10 w-10 animate-spin text-primary mx-auto mb-4"
          />

          <p className="text-muted-foreground">
            Aapki fasalein load ho rahi hain...
          </p>

        </div>

      </div>
    );
  }


  /* =======================================================
     SUMMARY COUNTS
  ======================================================= */

  const activeCount =
    crops.filter(
      (crop) =>
        getStatus(crop) === "active"
    ).length;

  const soldCount =
    crops.filter(
      (crop) =>
        getStatus(crop) === "sold"
    ).length;

  const pendingCount =
    crops.filter(
      (crop) =>
        getStatus(crop) === "pending"
    ).length;


  /* =======================================================
     UI
  ======================================================= */

  return (

    <div className="min-h-screen bg-background">


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="gradient-hero text-primary-foreground px-4 sm:px-6 py-4 shadow-lg">

        <div className="max-w-7xl mx-auto flex items-center justify-between">


          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="p-2 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">

              <Sprout className="h-6 w-6" />

            </div>

            <h1 className="text-xl font-bold">
              Apna Kheti
            </h1>

          </div>


          {/* Header Actions */}

          <div className="flex items-center gap-2">

            <Link to="/farmer/dashboard">

              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
              >
                Dashboard
              </Button>

            </Link>


            <Link to="/farmer/orders">

              <button
                className="relative p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors"
              >

                <Bell className="h-5 w-5" />

                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-accent rounded-full border-2 border-primary" />

              </button>

            </Link>


            <Link to="/farmer/profile">

              <button
                className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors"
              >

                <User className="h-5 w-5" />

              </button>

            </Link>


            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors"
              title="Logout"
            >

              <LogOut className="h-5 w-5" />

            </button>

          </div>

        </div>

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">


        {/* Back */}

        <Link
          to="/farmer/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >

          <ArrowLeft className="h-4 w-4" />

          Dashboard pe wapas

        </Link>


        {/* =================================================
            TITLE
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">

          <div>

            <h2 className="text-2xl font-bold text-foreground">
              🌾 Meri Fasalein
            </h2>

            <p className="text-muted-foreground mt-1">
              Apni sabhi fasalein dekhein aur manage karein
            </p>

          </div>


          <Link to="/farmer/add-crop">

            <Button className="gap-2 rounded-xl gradient-primary text-primary-foreground hover:shadow-lg transition-all">

              <Plus className="h-4 w-4" />

              Nayi Fasal Jodein

            </Button>

          </Link>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="p-4 rounded-xl border border-red-300 bg-red-50 text-red-600">

            {error}

          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-3 gap-4 animate-fade-up">


          <Card className="glass-card rounded-2xl text-center p-4">

            <p className="text-2xl font-bold text-primary">
              {activeCount}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Active
            </p>

          </Card>


          <Card className="glass-card rounded-2xl text-center p-4">

            <p className="text-2xl font-bold text-secondary">
              {soldCount}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Sold
            </p>

          </Card>


          <Card className="glass-card rounded-2xl text-center p-4">

            <p className="text-2xl font-bold text-accent-foreground">
              {pendingCount}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Pending
            </p>

          </Card>


        </div>


        {/* =================================================
            CROPS
        ================================================= */}

        <div className="space-y-4">


          {crops.length === 0 ? (

            <Card className="glass-card rounded-2xl">

              <CardContent className="py-14 text-center">

                <div className="text-6xl mb-4">
                  🌱
                </div>

                <h3 className="text-lg font-bold">
                  Abhi koi fasal listed nahi hai
                </h3>

                <p className="text-sm text-muted-foreground mt-2 mb-5">
                  Apni pehli fasal market mein list karein.
                </p>

                <Link to="/farmer/add-crop">

                  <Button className="gap-2 rounded-xl">

                    <Plus className="h-4 w-4" />

                    Nayi Fasal Add Karein

                  </Button>

                </Link>

              </CardContent>

            </Card>

          ) : (

            crops.map((crop) => {

              const status =
                getStatus(crop);

              const config =
                statusConfig[status] ||
                statusConfig.active;


              return (

                <Card
                  key={crop.id}
                  className="glass-card rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-up-delay group overflow-hidden"
                >

                  <CardContent className="p-5">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">


                      {/* =================================================
                          IMAGE + CROP INFO
                      ================================================= */}

                      <div className="flex items-center gap-4">


                        {/* Crop Image */}

                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted/50 border border-border/60 flex-shrink-0 flex items-center justify-center">

                          {crop.imageUrl ? (

                            <img
                              src={crop.imageUrl}
                              alt={getCropName(crop)}
                              className="w-full h-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />

                          ) : (

                            <div className="flex flex-col items-center justify-center text-center">

                              <span className="text-4xl">
                                {getCropEmoji(crop)}
                              </span>

                              <ImageIcon className="h-3 w-3 text-muted-foreground mt-1" />

                            </div>

                          )}

                        </div>


                        {/* Info */}

                        <div>

                          <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">

                            {getCropName(crop)}

                          </h3>


                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">

                            <span>
                              {getQuantity(crop)}
                            </span>

                            <span>
                              •
                            </span>

                            <span className="font-semibold text-foreground">

                              {getPrice(crop)}

                            </span>

                          </div>


                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">

                            <span className="flex items-center gap-1">

                              <Eye className="h-3 w-3" />

                              {crop.views ?? 0} views

                            </span>

                            <span>
                              •
                            </span>

                            <span>
                              {crop.inquiries ?? 0} inquiries
                            </span>

                          </div>


                          {/* Location */}

                          {(crop.village ||
                            crop.district ||
                            crop.state) && (

                            <p className="text-xs text-muted-foreground mt-2">

                              📍{" "}

                              {[
                                crop.village,
                                crop.district,
                                crop.state,
                              ]
                                .filter(Boolean)
                                .join(", ")}

                            </p>

                          )}

                        </div>

                      </div>


                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="flex items-center gap-3">

                        <Badge
                          variant={config.variant}
                          className="rounded-lg"
                        >

                          {config.label}

                        </Badge>


                        {/* Edit */}

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl h-9 w-9 hover:bg-primary/5 hover:border-primary/40"
                          title="Edit crop"
                          onClick={() =>
                            navigate(
                              `/farmer/edit-crop/${crop.id}`
                            )
                          }
                        >

                          <Edit className="h-4 w-4" />

                        </Button>


                        {/* Delete */}

                        <Button
                          variant="outline"
                          size="icon"
                          disabled={
                            deletingId === crop.id
                          }
                          onClick={() =>
                            handleDelete(crop)
                          }
                          className="rounded-xl h-9 w-9 hover:bg-destructive/5 hover:border-destructive/40 hover:text-destructive"
                          title="Delete crop"
                        >

                          {deletingId === crop.id ? (

                            <Loader2 className="h-4 w-4 animate-spin" />

                          ) : (

                            <Trash2 className="h-4 w-4" />

                          )}

                        </Button>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              );
            })

          )}

        </div>

      </main>

    </div>
  );
};


export default MyCrops;