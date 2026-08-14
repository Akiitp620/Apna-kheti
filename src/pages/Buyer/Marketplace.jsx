import { useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Bell, User, LogOut, Search, Filter, ShoppingCart, MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent } from "@/Components/Ui/Card";
import { Input } from "@/Components/Ui/Input";
import { Badge } from "@/Components/Ui/Badge";

const allCrops = [
  { id: 1, name: "Gehun (Wheat)", emoji: "🌾", price: "₹2,200/Q", farmer: "Ramesh Kumar", location: "Lucknow, UP", rating: 4.5, organic: true, quantity: "50 Quintal" },
  { id: 2, name: "Tamatar (Tomato)", emoji: "🍅", price: "₹45/Kg", farmer: "Suresh Yadav", location: "Nashik, MH", rating: 4.8, organic: false, quantity: "200 Kg" },
  { id: 3, name: "Aaloo (Potato)", emoji: "🥔", price: "₹30/Kg", farmer: "Mohan Singh", location: "Agra, UP", rating: 4.2, organic: false, quantity: "500 Kg" },
  { id: 4, name: "Pyaaz (Onion)", emoji: "🧅", price: "₹35/Kg", farmer: "Priya Devi", location: "Indore, MP", rating: 4.6, organic: true, quantity: "300 Kg" },
  { id: 5, name: "Dhaniya (Coriander)", emoji: "🌿", price: "₹120/Kg", farmer: "Rajesh Patel", location: "Rajkot, GJ", rating: 4.9, organic: true, quantity: "20 Kg" },
  { id: 6, name: "Mirchi (Chili)", emoji: "🌶️", price: "₹80/Kg", farmer: "Kiran Bai", location: "Guntur, AP", rating: 4.3, organic: false, quantity: "100 Kg" },
  { id: 7, name: "Chawal (Rice)", emoji: "🍚", price: "₹3,500/Q", farmer: "Anil Kumar", location: "Thanjavur, TN", rating: 4.7, organic: true, quantity: "100 Quintal" },
  { id: 8, name: "Aam (Mango)", emoji: "🥭", price: "₹60/Kg", farmer: "Bhola Nath", location: "Malihabad, UP", rating: 4.4, organic: false, quantity: "500 Kg" },
];

const filterCategories = ["Sabhi", "Anaaj", "Sabzi", "Phal", "Masale", "Organic"];

const Marketplace = () => {
  const [activeFilter, setActiveFilter] = useState("Sabhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Apna Kheti</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <button className="relative p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs font-bold flex items-center justify-center">3</span>
              </button>
            </Link>

            <button className="relative p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
           <Link to="/farmer/profile"> 
            <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <User className="h-5 w-5" />
            </button>
            </Link>
            <Link to="/login">
              <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold">🛒 Mandi Marketplace</h2>
            <p className="text-primary-foreground/80 mt-1">Seedha kisan se khareedein — fresh aur sasta</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-8 space-y-6">
        {/* Search & Filters */}
        <Card className="glass-card rounded-2xl animate-fade-up">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Fasal khojein... e.g., Gehun, Tamatar"
                  className="pl-10 h-11 rounded-xl bg-muted/50 border-border/60"
                />
              </div>
              <Button variant="outline" className="h-11 gap-2 rounded-xl">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      
      {/* Crop Grid */}
      {/* Crop Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {allCrops.map((crop) => (
    /* Link ko App.jsx ke route (/crop/:id) se match kiya */
    <Link to={`/crop/${crop.id}`} key={crop.id} className="block group relative">
      <Card className="glass-card rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up-delay overflow-hidden">
        
        {/* Image Section */}
        <div className="h-40 gradient-primary flex items-center justify-center relative">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {crop.emoji}
          </span>
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation(); // 👈 Ye click ko Link tak jane se rokega
              toggleFavorite(crop.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-20"
          >
            <Heart className={`h-4 w-4 ${favorites.includes(crop.id) ? "fill-accent text-accent" : "text-primary-foreground"}`} />
          </button>
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {crop.name}
          </h3>
          <p className="text-xl font-bold text-primary">{crop.price}</p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {crop.location}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{crop.farmer}</span>
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-xs font-medium">{crop.rating}</span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Link to="/cart">
            
              <Button
                size="sm"
                className="h-8 rounded-lg text-xs gradient-primary text-primary-foreground z-20 "
                onClick={(e) => {
                  
                 
                
              }}
            >
              <ShoppingCart className="h-3 w-3 mr-1" /> Add
            </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>

      </main>
    </div>
  );
};

export default Marketplace;
