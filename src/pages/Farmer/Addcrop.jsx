import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Brain,
  Upload,
  ArrowLeft,
  X,
} from "lucide-react";

import { Button } from "@/Components/Ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Ui/Card";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import { Textarea } from "@/Components/Ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Ui/Select";

import { supabase } from "../../Lib/supabase";

const categories = [
  {
    name: "Anaaj (Grains)",
    emoji: "🌾",
    value: "grains",
  },
  {
    name: "Sabzi (Vegetables)",
    emoji: "🥦",
    value: "vegetables",
  },
  {
    name: "Phal (Fruits)",
    emoji: "🍎",
    value: "fruits",
  },
  {
    name: "Masale (Spices)",
    emoji: "🌶️",
    value: "spices",
  },
  {
    name: "Dairy",
    emoji: "🥛",
    value: "dairy",
  },
  {
    name: "Others",
    emoji: "🪴",
    value: "others",
  },
];

const AddCrop = () => {
  const fileInputRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [description, setDescription] = useState("");

  // Image states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // IMAGE SELECT
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please sirf JPG, PNG, WEBP ya valid image file select karein."
      );

      // Reset input
      e.target.value = "";
      return;
    }

    // Maximum 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Image maximum 5MB ki honi chahiye.");

      // Reset input
      e.target.value = "";
      return;
    }

    // Save selected file
    setSelectedImage(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ---------------------------------------------------------
    // 1. Basic validation
    // ---------------------------------------------------------

    if (!selectedCategory) {
      setError("Please crop ki category select karein.");
      return;
    }

    if (!cropName.trim()) {
      setError("Please crop ka naam enter karein.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError("Please valid quantity enter karein.");
      return;
    }

    if (!price || Number(price) < 0) {
      setError("Please valid price enter karein.");
      return;
    }

    if (!unit) {
      setError("Please unit select karein.");
      return;
    }

    if (!village.trim()) {
      setError("Please village enter karein.");
      return;
    }

    if (!district.trim()) {
      setError("Please district enter karein.");
      return;
    }

    if (!state.trim()) {
      setError("Please state enter karein.");
      return;
    }

    // ---------------------------------------------------------
    // 2. Start loading
    // ---------------------------------------------------------

    try {
      setLoading(true);

      // -------------------------------------------------------
      // 3. Get currently logged-in user
      // -------------------------------------------------------

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error(
          "Aap logged in nahi hain. Please pehle login karein."
        );
      }

      // -------------------------------------------------------
      // 4. Verify farmer profile
      // -------------------------------------------------------

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("id, role")
          .eq("id", user.id)
          .single();

      if (profileError) {
        throw new Error(
          "Aapka profile nahi mila. Please dobara login karein."
        );
      }

      if (profile.role !== "farmer") {
        throw new Error(
          "Sirf farmer crop list kar sakta hai."
        );
      }

      // -------------------------------------------------------
      // 5. Create location
      // -------------------------------------------------------

      const location = [
        village.trim(),
        district.trim(),
        state.trim(),
      ]
        .filter(Boolean)
        .join(", ");

      // -------------------------------------------------------
      // 6. Upload image to Supabase Storage
      // -------------------------------------------------------

      let imageUrl = null;

      if (selectedImage) {
        // Get file extension
        const fileExtension =
          selectedImage.name.split(".").pop()?.toLowerCase() || "jpg";

        // Create unique file name
        const fileName = `${user.id}/${crypto.randomUUID()}.${fileExtension}`;

        console.log("Uploading image:", fileName);

        const { error: uploadError } = await supabase.storage
          .from("crop-images")
          .upload(fileName, selectedImage, {
            cacheControl: "3600",
            upsert: false,
            contentType: selectedImage.type,
          });

        if (uploadError) {
          console.error("Image upload error:", uploadError);

          throw new Error(
            `Image upload failed: ${uploadError.message}`
          );
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("crop-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;

        console.log("Image uploaded successfully:", imageUrl);
      }

      // -------------------------------------------------------
      // 7. Insert crop into Supabase Database
      // -------------------------------------------------------

      const { data, error: insertError } = await supabase
        .from("crops")
        .insert({
          farmer_id: user.id,
          name: cropName.trim(),
          category: selectedCategory,
          description: description.trim() || null,
          price: Number(price),
          quantity: Number(quantity),
          unit: unit,

          // IMPORTANT:
          // Image URL is now saved here
          image_url: imageUrl,

          location: location,
          is_available: true,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      console.log("Crop successfully added:", data);

      // -------------------------------------------------------
      // 8. Success message
      // -------------------------------------------------------

      setSuccess(
        "🌾 Fasal successfully market mein list ho gayi!"
      );

      // -------------------------------------------------------
      // 9. Reset form
      // -------------------------------------------------------

      setSelectedCategory("");
      setCropName("");
      setQuantity("");
      setPrice("");
      setUnit("");
      setVillage("");
      setDistrict("");
      setState("");
      setAddress("");
      setDescription("");

      setSelectedImage(null);
      setImagePreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowAiSuggestion(false);

    } catch (error) {
      console.error("Add crop error:", error);

      setError(
        error.message ||
          "Fasal list nahi ho paayi. Please dobara try karein."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="bg-background">

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Back */}
        <Link
          to="/farmer/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard pe wapas
        </Link>

        {/* Heading */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground">
            🌱 Nayi Fasal Jodein
          </h2>

          <p className="text-muted-foreground mt-1">
            Apni fasal ki details bharein aur market mein list karein
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              CATEGORY
          ================================================= */}

          <Card className="glass-card rounded-2xl animate-fade-up">

            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                📂 Category Chunein
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(cat.value)
                    }
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                      selectedCategory === cat.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >

                    <span className="text-3xl block mb-2">
                      {cat.emoji}
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      {cat.name}
                    </span>

                  </button>
                ))}

              </div>

            </CardContent>
          </Card>

          {/* =================================================
              CROP DETAILS
          ================================================= */}

          <Card className="glass-card rounded-2xl animate-fade-up-delay">

            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                📋 Fasal ki Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Name + Quantity */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Crop Name */}

                <div className="space-y-2">

                  <Label className="text-sm font-semibold">
                    Fasal ka Naam
                  </Label>

                  <div className="relative">

                    <Input
                      value={cropName}
                      onChange={(e) =>
                        setCropName(e.target.value)
                      }
                      placeholder="e.g., Gehun, Tamatar"
                      className="h-12 rounded-xl bg-muted/50 border-border/60 pr-10"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Mic className="h-4 w-4" />
                    </button>

                  </div>

                </div>

                {/* Quantity */}

                <div className="space-y-2">

                  <Label className="text-sm font-semibold">
                    Quantity
                  </Label>

                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }
                    placeholder="e.g., 100"
                    className="h-12 rounded-xl bg-muted/50 border-border/60"
                  />

                </div>

              </div>

              {/* Price + Unit */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Price */}

                <div className="space-y-2">

                  <Label className="text-sm font-semibold">
                    Aapka Price (₹)
                  </Label>

                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    placeholder="e.g., 2200"
                    className="h-12 rounded-xl bg-muted/50 border-border/60"
                  />

                </div>

                {/* Unit */}

                <div className="space-y-2">

                  <Label className="text-sm font-semibold">
                    Unit
                  </Label>

                  <Select
                    value={unit}
                    onValueChange={setUnit}
                  >

                    <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">

                      <SelectValue placeholder="Unit chunein" />

                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="per-quintal">
                        Per Quintal
                      </SelectItem>

                      <SelectItem value="per-kg">
                        Per Kg
                      </SelectItem>

                      <SelectItem value="per-ton">
                        Per Ton
                      </SelectItem>

                      <SelectItem value="per-dozen">
                        Per Dozen
                      </SelectItem>

                      <SelectItem value="per-piece">
                        Per Piece
                      </SelectItem>

                      <SelectItem value="per-liter">
                        Per Liter
                      </SelectItem>

                      <SelectItem value="per-crate">
                        Per Crate
                      </SelectItem>

                    </SelectContent>

                  </Select>

                </div>

              </div>

              {/* Village */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Village
                </Label>

                <Input
                  value={village}
                  onChange={(e) =>
                    setVillage(e.target.value)
                  }
                  placeholder="Apne gaon ka naam likhein"
                  className="h-12 rounded-xl bg-muted/50 border-border/60"
                />

              </div>

              {/* District */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  District
                </Label>

                <Input
                  value={district}
                  onChange={(e) =>
                    setDistrict(e.target.value)
                  }
                  placeholder="Apne Zila ka naam likhein"
                  className="h-12 rounded-xl bg-muted/50 border-border/60"
                />

              </div>

              {/* State */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  State
                </Label>

                <Input
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                  placeholder="Apne rajy ka naam likhein"
                  className="h-12 rounded-xl bg-muted/50 border-border/60"
                />

              </div>

              {/* Address */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Address
                </Label>

                <Input
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Apna pura pata likhein"
                  className="h-12 rounded-xl bg-muted/50 border-border/60"
                />

              </div>

              {/* Description */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Description (Optional)
                </Label>

                <Textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Fasal ke baare mein kuch likhein..."
                  className="rounded-xl bg-muted/50 border-border/60 resize-none"
                />

              </div>

              {/* =================================================
                  IMAGE UPLOAD
              ================================================= */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">
                  Photo Upload
                </Label>

                {/* Hidden file input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Upload box */}

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="border-2 border-dashed border-border/60 rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer"
                >

                  {imagePreview ? (

                    /* ===============================
                       IMAGE PREVIEW
                    =============================== */

                    <div className="space-y-4">

                      <div className="relative">

                        <img
                          src={imagePreview}
                          alt="Crop preview"
                          className="mx-auto h-48 w-full max-w-md object-cover rounded-xl"
                        />

                        {/* Remove button */}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>

                      </div>

                      <div>

                        <p className="text-sm font-medium text-primary truncate">
                          {selectedImage?.name}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          Click karke image change karein
                        </p>

                      </div>

                    </div>

                  ) : (

                    /* ===============================
                       EMPTY UPLOAD STATE
                    =============================== */

                    <>

                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />

                      <p className="text-sm text-muted-foreground">
                        Photo dalein ya yahan click karein
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, WEBP — Max 5MB
                      </p>

                    </>

                  )}

                </div>

              </div>

            </CardContent>
          </Card>

          {/* =================================================
              AI PRICE SUGGESTION
          ================================================= */}

          <Card className="glass-card rounded-2xl animate-fade-up-delay-2">

            <CardContent className="p-5">

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setShowAiSuggestion(true)
                }
                className="w-full h-12 rounded-xl gap-2 border-primary/30 hover:bg-primary/5"
              >

                <Brain className="h-5 w-5 text-primary" />

                AI se Price Suggestion Lein

              </Button>

              {showAiSuggestion && (

                <div className="mt-4 p-4 rounded-xl gradient-primary text-primary-foreground animate-fade-up">

                  <div className="flex items-center gap-2 mb-2">

                    <Brain className="h-5 w-5" />

                    <span className="font-bold">
                      AI Suggestion
                    </span>

                  </div>

                  <p className="text-sm text-primary-foreground/90">

                    Gehun ka current market rate ₹2,100-₹2,300/Quintal
                    hai. Aapke area mein demand moderate hai.

                    <br />

                    <span className="font-semibold">
                      Suggested Price: ₹2,250/Quintal
                    </span>

                  </p>

                </div>

              )}

            </CardContent>
          </Card>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {error}
            </div>

          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
              {success}
            </div>

          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
          >

            {loading
              ? "Fasal list ho rahi hai..."
              : "✅ Fasal List Karein"}

          </Button>

        </form>

      </main>

    </div>
  );
};

export default AddCrop;