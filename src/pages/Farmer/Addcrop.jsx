import { useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Bell, User, LogOut, Mic, Brain, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import { Textarea } from "@/Components/Ui/Textarea";
import { Badge } from "@/Components/Ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/Ui/Select";

const categories = [
  { name: "Anaaj (Grains)", emoji: "🌾", value: "grains" },
  { name: "Sabzi (Vegetables)", emoji: "🥦", value: "vegetables" },
  { name: "Phal (Fruits)", emoji: "🍎", value: "fruits" },
  { name: "Masale (Spices)", emoji: "🌶️", value: "spices" },
  { name: "Dairy", emoji: "🥛", value: "dairy" },
  { name: "Others", emoji: "🪴", value: "others" },
];

const AddCrop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  return (
    <div className="bg-background">

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back */}
        <Link to="/farmer/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Dashboard pe wapas
        </Link>

        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground">🌱 Nayi Fasal Jodein</h2>
          <p className="text-muted-foreground mt-1">Apni fasal ki details bharein aur market mein list karein</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Category Selection */}
          <Card className="glass-card rounded-2xl animate-fade-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">📂 Category Chunein</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                      selectedCategory === cat.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{cat.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crop Details */}
          <Card className="glass-card rounded-2xl animate-fade-up-delay">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">📋 Fasal ki Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Fasal ka Naam</Label>
                  <div className="relative">
                    <Input placeholder="e.g., Gehun, Tamatar" className="h-12 rounded-xl bg-muted/50 border-border/60 pr-10" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Quantity</Label>
                  <Input placeholder="e.g., 50 Quintal, 100 Kg" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Aapka Price (₹)</Label>
                  <Input placeholder="e.g., 2200" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                </div>
                </div>

                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Unit</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">
                      <SelectValue placeholder="Unit chunein" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per-quintal">Per Quintal</SelectItem>
                      <SelectItem value="per-kg">Per Kg</SelectItem>
                      <SelectItem value="per-ton">Per Ton</SelectItem>
                      <SelectItem value="per-dozen">Per Dozen</SelectItem>
                      <SelectItem value="per-piece">Per Piece</SelectItem>
                      <SelectItem value="per-liter">Per Liter</SelectItem>
                      <SelectItem value="per-crate">Per Crate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
              
             
              <div className="space-y-2">
                  <Label className="text-sm font-semibold">Village </Label>
                  <Input placeholder="Apne gaon ka naam likhein" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                </div>
                

               
                 <div className="space-y-2">
                   <Label className="text-sm font-semibold">District </Label>
                   <Input placeholder="Apne Zila ka naam likhein" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                 </div>
                 

                  
                 <div className="space-y-2">
                   <Label className="text-sm font-semibold">State </Label>
                   <Input placeholder="Apne rajy ka naam likhein" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                 </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Address </Label>
                  <Input placeholder="Apne pura pata likhein" className="h-12 rounded-xl bg-muted/50 border-border/60" />
                </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Description (Optional)</Label>
                <Textarea placeholder="Fasal ke baare mein kuch likhein..." className="rounded-xl bg-muted/50 border-border/60 resize-none" />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Photo Upload</Label>
                <div className="border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Photo dalein ya yahan click karein</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG — Max 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Price Suggestion */}
          <Card className="glass-card rounded-2xl animate-fade-up-delay-2">
            <CardContent className="p-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAiSuggestion(true)}
                className="w-full h-12 rounded-xl gap-2 border-primary/30 hover:bg-primary/5"
              >
                <Brain className="h-5 w-5 text-primary" /> AI se Price Suggestion Lein
              </Button>

              {showAiSuggestion && (
                <div className="mt-4 p-4 rounded-xl gradient-primary text-primary-foreground animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5" />
                    <span className="font-bold">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-primary-foreground/90">
                    Gehun ka current market rate ₹2,100-₹2,300/Quintal hai. Aapke area mein demand moderate hai.
                    <br />
                    <span className="font-semibold">Suggested Price: ₹2,250/Quintal</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            ✅ Fasal List Karein
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddCrop;
