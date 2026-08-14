import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Badge } from "@/Components/Ui/Badge";
import { Card, CardContent } from "@/Components/Ui/Card";
import { ArrowLeft, ShoppingCart, Star, MapPin, Phone, Truck, Shield, Minus, Plus, Heart } from "lucide-react";



const cropData = {
  id: "1",
  name: "Organic Gehu (Wheat)",
  farmer: "Ramesh Kumar",
  village: "Sundarpur, Varanasi",
  price: 2400,
  unit: "quintal",
  quantity: 50,
  rating: 4.5,
  reviews: 23,
  description: "100% organic gehu, koi chemical nahi. Pichle 10 saal se organic farming kar rahe hain. Daan bada aur saaf hai.",
  features: ["Organic Certified", "Chemical Free", "Fresh Harvest", "Lab Tested"],
  images: ["🌾"],
};

const CropDetails = () => {
  const { id: _id } = useParams();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/marketplace">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-foreground">Fasal Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLiked(!liked)} className="p-2 rounded-xl hover:bg-muted transition-colors">
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-xl relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">2</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Image */}
        <div className="w-full h-64 rounded-2xl bg-primary/5 border border-border/50 flex items-center justify-center">
          <span className="text-8xl">{cropData.images[0]}</span>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{cropData.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">by {cropData.farmer}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{cropData.price}</p>
              <p className="text-xs text-muted-foreground">per {cropData.unit}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">{cropData.rating}</span>
              <span className="text-xs text-muted-foreground">({cropData.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{cropData.village}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {cropData.features.map((f) => (
              <Badge key={f} variant="secondary" className="rounded-full text-xs bg-primary/10 text-primary border-0">{f}</Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <Card className="border-border/50">
          <CardContent className="pt-5 space-y-3">
            <h3 className="font-semibold text-foreground">Fasal ke baare mein</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{cropData.description}</p>
          </CardContent>
        </Card>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: "Safe Payment" },
            { icon: Truck, label: "Fast Delivery" },
            { icon: Phone, label: "Direct Contact" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/50 border border-border/30">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-lg border-t border-border/50 -mx-4 px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-3 py-2 border border-border/50">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 rounded-lg hover:bg-background transition-colors">
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-bold text-lg w-8 text-center">{qty}</span>
             <button onClick={() => setQty(qty + 1)} className="p-1 rounded-lg hover:bg-background transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            
          </div>
            <Link to="/cart">
              <Button className="flex-1 h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart mein Daalein — ₹{cropData.price * qty}
              </Button>
            </Link>


          
        </div>
      </main>
    </div>
  );
};

export default CropDetails;
