import { Link } from "react-router-dom";
import { Sprout, Bell, User, LogOut, Edit, Trash2, Plus, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";

const crops = [
  { id: 1, name: "Gehun (Wheat)", emoji: "🌾", quantity: "50 Quintal", price: "₹2,200/Q", status: "active", views: 120, inquiries: 8 },
  { id: 2, name: "Tamatar (Tomato)", emoji: "🍅", quantity: "20 Kg", price: "₹45/Kg", status: "sold", views: 85, inquiries: 15 },
  { id: 3, name: "Aaloo (Potato)", emoji: "🥔", quantity: "100 Kg", price: "₹30/Kg", status: "active", views: 200, inquiries: 12 },
  { id: 4, name: "Pyaaz (Onion)", emoji: "🧅", quantity: "75 Kg", price: "₹35/Kg", status: "pending", views: 65, inquiries: 3 },
  { id: 5, name: "Dhaniya (Coriander)", emoji: "🌿", quantity: "10 Kg", price: "₹120/Kg", status: "active", views: 42, inquiries: 5 },
];

const statusConfig = {
  active: { label: "Active ✅", variant: "default" },
  sold: { label: "Bik Gaya 💰", variant: "secondary" },
  pending: { label: "Pending ⏳", variant: "outline" },
};

const MyCrops = () => {
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
            <Link to="/farmer/dashboard">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
                Dashboard
              </Button>
            </Link>
            <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <Link to="/login">
              <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Link to="/farmer/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Dashboard pe wapas
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
          <div>
            <h2 className="text-2xl font-bold text-foreground">🌾 Meri Fasalein</h2>
            <p className="text-muted-foreground mt-1">Apni sabhi fasalein dekhein aur manage karein</p>
          </div>
          <Link to="/farmer/add-crop">
            <Button className="gap-2 rounded-xl gradient-primary text-primary-foreground hover:shadow-lg transition-all">
              <Plus className="h-4 w-4" /> Nayi Fasal Jodein
            </Button>
          </Link>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 animate-fade-up">
          <Card className="glass-card rounded-2xl text-center p-4">
            <p className="text-2xl font-bold text-primary">{crops.filter(c => c.status === "active").length}</p>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </Card>
          <Card className="glass-card rounded-2xl text-center p-4">
            <p className="text-2xl font-bold text-secondary">{crops.filter(c => c.status === "sold").length}</p>
            <p className="text-xs text-muted-foreground mt-1">Sold</p>
          </Card>
          <Card className="glass-card rounded-2xl text-center p-4">
            <p className="text-2xl font-bold text-accent-foreground">{crops.filter(c => c.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground mt-1">Pending</p>
          </Card>
        </div>

        {/* Crops */}
        <div className="space-y-4">
          {crops.map((crop) => (
            <Card key={crop.id} className="glass-card rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-up-delay group">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{crop.emoji}</span>
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{crop.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{crop.quantity}</span>
                        <span>•</span>
                        <span className="font-semibold text-foreground">{crop.price}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {crop.views} views</span>
                        <span>• {crop.inquiries} inquiries</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusConfig[crop.status].variant} className="rounded-lg">
                      {statusConfig[crop.status].label}
                    </Badge>
                    <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 hover:bg-primary/5 hover:border-primary/40">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 hover:bg-destructive/5 hover:border-destructive/40 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyCrops;
