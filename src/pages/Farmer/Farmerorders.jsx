import { Link } from "react-router-dom";
import { Sprout, Bell, User, LogOut, Check, X, ArrowLeft, Clock, Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";

const orders = [
  {
    id: "ORD-001", buyer: "Vikram Traders", crop: "Gehun (Wheat)", emoji: "🌾",
    quantity: "20 Quintal", total: "₹44,000", status: "new", time: "30 min pehle",
    location: "Lucknow, UP",
  },
  {
    id: "ORD-002", buyer: "Fresh Mart", crop: "Tamatar (Tomato)", emoji: "🍅",
    quantity: "50 Kg", total: "₹2,250", status: "accepted", time: "2 ghante pehle",
    location: "Kanpur, UP",
  },
  {
    id: "ORD-003", buyer: "Sabzi Mandi Co.", crop: "Aaloo (Potato)", emoji: "🥔",
    quantity: "200 Kg", total: "₹6,000", status: "dispatched", time: "1 din pehle",
    location: "Delhi, DL",
  },
  {
    id: "ORD-004", buyer: "Grocery Hub", crop: "Pyaaz (Onion)", emoji: "🧅",
    quantity: "100 Kg", total: "₹3,500", status: "delivered", time: "3 din pehle",
    location: "Jaipur, RJ",
  },
  {
    id: "ORD-005", buyer: "Kisan Bazaar", crop: "Dhaniya (Coriander)", emoji: "🌿",
    quantity: "5 Kg", total: "₹600", status: "rejected", time: "2 din pehle",
    location: "Bhopal, MP",
  },
];

const statusConfig = {
  new: { label: "Naya Order 🆕", icon: Clock, color: "bg-accent/20 text-accent-foreground" },
  accepted: { label: "Accept ✅", icon: Check, color: "bg-primary/15 text-primary" },
  dispatched: { label: "Bhej Diya 🚚", icon: Truck, color: "bg-secondary/15 text-secondary" },
  delivered: { label: "Deliver Ho Gaya ✅", icon: Package, color: "bg-primary/20 text-primary" },
  rejected: { label: "Reject ❌", icon: X, color: "bg-destructive/15 text-destructive" },
};

const FarmerOrders = () => {
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
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">Dashboard</Button>
            </Link>
            <Link to="/farmer/orders">
              <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold">📦 Mere Orders</h2>
          <p className="text-primary-foreground/80 mt-1">Sabhi orders ka status dekhein aur manage karein</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 pb-8 space-y-6">
        <Link to="/farmer/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Dashboard pe wapas
        </Link>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up">
          {[
            { label: "Naye", count: 1, emoji: "🆕" },
            { label: "Accepted", count: 1, emoji: "✅" },
            { label: "Dispatched", count: 1, emoji: "🚚" },
            { label: "Delivered", count: 1, emoji: "📦" },
          ].map((s) => (
            <Card key={s.label} className="glass-card rounded-2xl text-center p-4">
              <p className="text-2xl font-bold text-foreground">{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.emoji} {s.label}</p>
            </Card>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            return (
              <Card key={order.id} className="glass-card rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-up-delay group">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{order.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{order.crop}</h3>
                          <Badge className={`${config.color} rounded-lg text-xs`}>{config.label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">{order.buyer}</span> • {order.quantity}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {order.location}</span>
                          <span>• {order.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-xl font-bold text-primary">{order.total}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                      {order.status === "new" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="rounded-xl gap-1.5 gradient-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-xl gap-1.5 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/40">
                            <X className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FarmerOrders;
