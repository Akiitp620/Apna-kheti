import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "@/Lib/supabase.js";

import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import { Textarea } from "@/Components/Ui/Textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Ui/Card";

import {
  ArrowLeft,
  Camera,
  MapPin,
  Phone,
  Mail,
  Save,
  User,
  Sprout,
  Loader2,
  LogOut,
} from "lucide-react";


const FarmerProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    district: "",
    state: "",
    address: "",
    bio: "",
    experience: "",
    landSize: "",
  });


  /* =====================================================
     GET CURRENT USER
  ===================================================== */

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


  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  const loadProfile = async (currentUser) => {
    try {
      setLoading(true);
      setError("");

      const {
        data,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }


      /*
       * Supabase Auth email is the real email.
       * Profile table stores the other information.
       */

      setProfile({
        name: data?.full_name || "",
        phone: data?.phone || "",
        email: currentUser.email || "",

        village: data?.village || "",
        district: data?.district || "",
        state: data?.state || "",

        address: data?.address || "",

        bio: data?.bio || "",

        experience:
          data?.experience !== null &&
          data?.experience !== undefined
            ? String(data.experience)
            : "",

        landSize:
          data?.land_size !== null &&
          data?.land_size !== undefined
            ? String(data.land_size)
            : "",
      });

    } catch (err) {
      console.error(
        "Profile load error:",
        err
      );

      setError(
        err.message ||
        "Profile load nahi ho payi."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    const initialize = async () => {
      try {
        const currentUser =
          await getCurrentUser();

        if (!currentUser) {
          return;
        }

        await loadProfile(currentUser);

      } catch (err) {
        console.error(err);

        setError(
          err.message ||
          "Something went wrong."
        );

        setLoading(false);
      }
    };

    initialize();
  }, []);


  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };


  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSave = async () => {
    if (!user) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");


      const experienceValue =
        profile.experience === ""
          ? null
          : Number(profile.experience);

      const landSizeValue =
        profile.landSize === ""
          ? null
          : Number(profile.landSize);


      /*
       * Update existing profile
       */

      const {
        error: updateError,
      } = await supabase
        .from("profiles")
        .update({
          full_name: profile.name.trim(),

          phone:
            profile.phone.trim() || null,

          village:
            profile.village.trim() || null,

          district:
            profile.district.trim() || null,

          state:
            profile.state.trim() || null,

          address:
            profile.address.trim() || null,

          bio:
            profile.bio.trim() || null,

          experience: experienceValue,

          land_size: landSizeValue,
        })
        .eq("id", user.id);


      if (updateError) {
        throw updateError;
      }


      setMessage(
        "✅ Profile successfully save ho gayi!"
      );

    } catch (err) {
      console.error(
        "Profile save error:",
        err
      );

      setError(
        err.message ||
        "Profile save nahi ho payi."
      );

    } finally {
      setSaving(false);
    }
  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    const {
      error: logoutError,
    } = await supabase.auth.signOut();

    if (logoutError) {
      console.error(logoutError);
      return;
    }

    navigate("/login");
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">

        <div className="text-center">

          <Loader2
            className="h-10 w-10 animate-spin text-primary mx-auto mb-4"
          />

          <p className="text-muted-foreground">
            Profile load ho rahi hai...
          </p>

        </div>

      </div>
    );
  }


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-background">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">

        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Link to="/farmer/dashboard">

              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
              >

                <ArrowLeft className="h-5 w-5" />

              </Button>

            </Link>

            <div>

              <h1 className="text-lg font-bold text-foreground">
                Meri Profile
              </h1>

              <p className="text-xs text-muted-foreground">
                Apni details update karein
              </p>

            </div>

          </div>


          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl hover:bg-muted transition-colors"
            title="Logout"
          >

            <LogOut className="h-5 w-5" />

          </button>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">


        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div className="flex flex-col items-center gap-3">

          <div className="relative">

            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">

              <User className="h-10 w-10 text-primary" />

            </div>


            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
              title="Profile photo"
            >

              <Camera className="h-4 w-4" />

            </button>

          </div>


          <h2 className="text-xl font-bold text-foreground">

            {profile.name || "Apna Naam Add Karein"}

          </h2>


          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">

            <Sprout className="h-4 w-4 text-primary" />

            <span>
              Kisan
              {profile.experience
                ? ` • ${profile.experience} saal ka anubhav`
                : ""}
            </span>

          </div>

        </div>


        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (

          <div className="p-4 rounded-xl border border-green-300 bg-green-50 text-green-700 text-sm">

            {message}

          </div>

        )}


        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (

          <div className="p-4 rounded-xl border border-red-300 bg-red-50 text-red-600 text-sm">

            {error}

          </div>

        )}


        {/* =================================================
            PERSONAL DETAILS
        ================================================= */}

        <Card className="border-border/50 shadow-sm">

          <CardHeader>

            <CardTitle className="text-base flex items-center gap-2">

              <User className="h-4 w-4 text-primary" />

              Personal Details

            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-4">


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


              {/* NAME */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Poora Naam
                </Label>

                <Input
                  value={profile.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Apna naam likhein"
                  className="h-11 rounded-xl bg-muted/50"
                />

              </div>


              {/* PHONE */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Phone Number
                </Label>

                <div className="relative">

                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="9876543210"
                    className="h-11 pl-10 rounded-xl bg-muted/50"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Email
                </Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    value={profile.email}
                    readOnly
                    className="h-11 pl-10 rounded-xl bg-muted/50 cursor-not-allowed"
                  />

                </div>

                <p className="text-xs text-muted-foreground">
                  Email Supabase account se linked hai.
                </p>

              </div>


              {/* EXPERIENCE */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Kheti ka Anubhav (saal)
                </Label>

                <Input
                  type="number"
                  min="0"
                  value={profile.experience}
                  onChange={(e) =>
                    handleChange(
                      "experience",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 10"
                  className="h-11 rounded-xl bg-muted/50"
                />

              </div>

            </div>


            {/* BIO */}

            <div className="space-y-2">

              <Label className="text-sm font-semibold">
                Apne baare mein
              </Label>

              <Textarea
                value={profile.bio}
                onChange={(e) =>
                  handleChange(
                    "bio",
                    e.target.value
                  )
                }
                placeholder="Apne baare mein kuch likhein..."
                className="rounded-xl bg-muted/50 min-h-[100px]"
              />

            </div>

          </CardContent>

        </Card>


        {/* =================================================
            LOCATION
        ================================================= */}

        <Card className="border-border/50 shadow-sm">

          <CardHeader>

            <CardTitle className="text-base flex items-center gap-2">

              <MapPin className="h-4 w-4 text-primary" />

              Location Details

            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-4">


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


              {/* VILLAGE */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Gaon / Village
                </Label>

                <Input
                  value={profile.village}
                  onChange={(e) =>
                    handleChange(
                      "village",
                      e.target.value
                    )
                  }
                  placeholder="Apna gaon"
                  className="h-11 rounded-xl bg-muted/50"
                />

              </div>


              {/* DISTRICT */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Zila / District
                </Label>

                <Input
                  value={profile.district}
                  onChange={(e) =>
                    handleChange(
                      "district",
                      e.target.value
                    )
                  }
                  placeholder="Apna zila"
                  className="h-11 rounded-xl bg-muted/50"
                />

              </div>


              {/* STATE */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Rajya / State
                </Label>

                <Input
                  value={profile.state}
                  onChange={(e) =>
                    handleChange(
                      "state",
                      e.target.value
                    )
                  }
                  placeholder="Apna rajya"
                  className="h-11 rounded-xl bg-muted/50"
                />

              </div>

            </div>


            {/* ADDRESS */}

            <div className="space-y-2">

              <Label className="text-sm font-semibold">
                Pura Address
              </Label>

              <Textarea
                value={profile.address}
                onChange={(e) =>
                  handleChange(
                    "address",
                    e.target.value
                  )
                }
                placeholder="Apna pura pata likhein..."
                className="rounded-xl bg-muted/50 min-h-[80px]"
              />

            </div>


            {/* LAND SIZE */}

            <div className="space-y-2">

              <Label className="text-sm font-semibold">
                Zameen ka Size (Acre)
              </Label>

              <Input
                type="number"
                min="0"
                step="0.01"
                value={profile.landSize}
                onChange={(e) =>
                  handleChange(
                    "landSize",
                    e.target.value
                  )
                }
                placeholder="e.g. 5"
                className="h-11 rounded-xl bg-muted/50"
              />

            </div>

          </CardContent>

        </Card>


        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >

          {saving ? (

            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />

              Profile Save ho rahi hai...
            </>

          ) : (

            <>
              <Save className="h-4 w-4 mr-2" />

              Profile Save Karein
            </>

          )}

        </Button>


      </main>

    </div>
  );
};


export default FarmerProfile;