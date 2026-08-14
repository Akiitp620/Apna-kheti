import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";
import { ArrowLeft, Package, MapPin, Clock, CheckCircle2, Truck, Navigation, Phone } from "lucide-react";

const deliveries = [
  { id: "DEL-001", from: "Ramesh Kumar", to: "Amit Sharma", item: "Organic Gehu - 2 Quintal", status: "pickup", fromLoc: "Sundarpur, Varanasi", toLoc: "Cantt, Varanasi", time: "30 min", emoji: "🌾" },
  { id: "DEL-002", from: "Suresh Yadav", to: "Neha Gupta", item: "Taze Tamatar - 10 Kg", status: "transit", fromLoc: "Chandauli", toLoc: "Lanka, Varanasi", time: "45 min", emoji: "🍅" },
  { id: "DEL-003", from: "Priya Devi", to: "Ravi Mishra", item: "Hara Dhaniya - 5 Kg", status: "delivered", fromLoc: "Mirzapur", toLoc: "Sigra, Varanasi", time: "Done", emoji: "🌿" },
];

const statusConfig = {
  pickup: { label: "Pickup Ready", color: "bg-accent/10 text-accent border-accent/20" },
  transit: { label: "On the Way", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  delivered: { label: "Delivered", color: "bg-primary/10 text-primary border-primary/20" },
};

const DeliveryDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Delivery Dashboard 🚚</h1>
            <p className="text-xs text-muted-foreground">Aaj ki deliveries</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Package, label: "Total", value: "12", color: "text-primary" },
            { icon: Truck, label: "Pending", value: "5", color: "text-accent" },
            { icon: CheckCircle2, label: "Done", value: "7", color: "text-primary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4 text-center space-y-1">
                <stat.icon className={`h-5 w-5 mx-auto ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Deliveries */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Active Deliveries</h2>
          {deliveries.map((d) => (
            <Card key={d.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-2xl">
                      {d.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{d.item}</p>
                      <p className="text-xs text-muted-foreground">{d.id}</p>
                    </div>
                  </div>

                  {/* ✅ FIXED HERE */}
                  <Badge className={`rounded-full text-xs ${statusConfig[d.status].color}`}>
                    {statusConfig[d.status].label}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1 p-2 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">
                      From: <span className="font-medium text-foreground">{d.from}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {d.fromLoc}
                    </p>
                  </div>

                  <Navigation className="h-4 w-4 text-primary shrink-0" />

                  <div className="flex-1 p-2 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">
                      To: <span className="font-medium text-foreground">{d.to}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {d.toLoc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{d.time}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                      <Phone className="h-3 w-3 mr-1" /> Call
                    </Button>

                    {d.status !== "delivered" && (
                      <Link to="/delivery/tracking">
                        <Button size="sm" className="rounded-lg text-xs h-8 gradient-primary text-primary-foreground">
                          <Navigation className="h-3 w-3 mr-1" /> Track
                        </Button>
                      </Link>
                    )}
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

export default DeliveryDashboard;