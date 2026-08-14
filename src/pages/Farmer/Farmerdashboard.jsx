import { Sprout, Package, IndianRupee, Brain, TrendingUp, Plus, BarChart3, Wheat, Bell, User, LogOut, ArrowUpRight } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";
import StatCard from "@/Components/Statcard.jsx";
import { Link } from "react-router-dom";

const crops = [
  { id: 1, name: "Gehun (Wheat)", quantity: "50 Quintal", price: "₹2,200/Q", status: "active", emoji: "🌾" },
  { id: 2, name: "Tamatar (Tomato)", quantity: "20 Kg", price: "₹45/Kg", status: "sold", emoji: "🍅" },
  { id: 3, name: "Aaloo (Potato)", quantity: "100 Kg", price: "₹30/Kg", status: "active", emoji: "🥔" },
  { id: 4, name: "Pyaaz (Onion)", quantity: "75 Kg", price: "₹35/Kg", status: "pending", emoji: "🧅" },
];

const aiSuggestions = [
  { crop: "Gehun", suggestion: "Agle hafte rate ₹2,350 tak ja sakta hai — abhi mat bechein", type: "hold" },
  { crop: "Tamatar", suggestion: "Demand badh rahi hai, price ₹50/Kg tak aa sakta hai", type: "sell" },
];

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="gradient-hero text-primary-foreground px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Apna Kheti</h1>
          </div>
          <div className="flex items-center gap-2">
          <Link to="/farmer/orders"> 
            <button className="relative p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-accent rounded-full border-2 border-primary" />
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

      {/* Welcome Banner */}
      <div className="gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="animate-fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold">Namaste, Ramesh ji! 🙏</h2>
              <p className="text-primary-foreground/80 mt-1">Aapka aaj ka dashboard — sab kuch ek nazar mein</p>
            </div>
            <div className="flex gap-2 self-start flex-wrap">
              <Link to="/ai-price">
                <Button className="gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Brain className="h-5 w-5 text-primary" /> AI Suggestions
                </Button>
              </Link>
              <Link to="/farmer/add-crop">
                <Button className="gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4" /> Nayi Fasal
                </Button>
              </Link>
              <Link to="/farmer/discussion">
                <Button className="gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  💬 Charcha
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up">
          <StatCard title="Total Fasalein" value="12" icon={Wheat} trend="↑ 3 naye is mahine" />
          <StatCard title="Active Orders" value="5" icon={Package} trend="2 aaj ke" />
          <StatCard title="Total Kamaai" value="₹1,85,000" icon={IndianRupee} trend="↑ 12% pichle mahine se" />
          <StatCard title="AI Suggestions" value="4" icon={Brain} trend="2 urgent" />
        </div>
        {/* --- AI Chatbot Floating Button --- */}
<div className="fixed bottom-6 right-6 z-50 group">
  {/* Tooltip jo hover karne par dikhega */}
  <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-card text-foreground text-xs font-bold px-4 py-2 rounded-xl shadow-2xl border border-border whitespace-nowrap">
      Kisan Sahayak AI 🌾
    </div>
  </div>

  {/* Main Floating Button */}
  <Link to="/Analytics/Chatbot">
  <button 
    onClick={() => alert("Kisan Sahayak AI chatbot jald hi shuru hoga!")}
    className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/40 hover:scale-110 transition-all duration-300 gradient-primary text-primary-foreground group"
  >
    {/* Background Glow/Ping Effect */}
    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
    
    {/* Robot / Chat Icon */}
    <div className="relative z-10">
      <Brain className="h-7 w-7 animate-pulse" />
      {/* Chota sa notification dot */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
      </span>
    </div>
  </button>
  </Link>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crops List */}
          <Card className="lg:col-span-2 glass-card rounded-2xl animate-fade-up-delay">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-bold">🌾 Aapki Fasalein</CardTitle>
              <Link to="/farmer/my-crops">
                <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
                  <BarChart3 className="h-3.5 w-3.5" /> Sab Dekhein
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/70 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{crop.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{crop.name}</p>
                      <p className="text-sm text-muted-foreground">{crop.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-bold text-foreground">{crop.price}</span>
                    <Badge
                      variant={crop.status === "active" ? "default" : crop.status === "sold" ? "secondary" : "outline"}
                      className="rounded-lg"
                    >
                      {crop.status === "active" ? "Active" : crop.status === "sold" ? "Bik Gaya" : "Pending"}
                    </Badge>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="glass-card rounded-2xl animate-fade-up-delay-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 font-bold">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-foreground">{item.crop}</span>
                    <Badge variant={item.type === "hold" ? "outline" : "default"} className="text-xs rounded-lg">
                      {item.type === "hold" ? "🛑 Ruko" : "✅ Becho"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.suggestion}</p>
                </div>
              ))}

              <Card className="gradient-primary border-0 rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary-foreground/15">
                      <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground text-sm">📈 Market Trend</p>
                      <p className="text-xs text-primary-foreground/80 mt-1 leading-relaxed">
                        Gehun ki demand agle 2 hafton mein 15% badhne ki sambhavna hai
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Demand Stats */}
        <Card className="glass-card rounded-2xl animate-fade-up-delay-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">📊 Demand Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Gehun Demand", value: "High 🔥", color: "text-primary", bg: "bg-primary/5 border-primary/20" },
                { label: "Tamatar Demand", value: "Medium ⚡", color: "text-secondary", bg: "bg-secondary/5 border-secondary/20" },
                { label: "Aaloo Demand", value: "Low 📉", color: "text-muted-foreground", bg: "bg-muted/50 border-border" },
                { label: "Pyaaz Demand", value: "High 🔥", color: "text-primary", bg: "bg-primary/5 border-primary/20" },
              ].map((item, i) => (
                <div key={i} className={`text-center p-5 rounded-xl border ${item.bg} hover:shadow-md transition-all duration-200`}>
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  <p className={`font-bold text-lg mt-2 ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerDashboard;
