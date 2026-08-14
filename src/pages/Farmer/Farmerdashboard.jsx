import { useEffect, useState } from "react";
import {
  Sprout,
  Package,
  IndianRupee,
  Brain,
  TrendingUp,
  Plus,
  BarChart3,
  Wheat,
  Bell,
  User,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";
import StatCard from "@/Components/Statcard.jsx";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "@/Lib/supabase.js";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [crops, setCrops] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // GET CURRENT USER + PROFILE + CROPS
  // --------------------------------------------------
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Get currently logged-in user
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!currentUser) {
          navigate("/login");
          return;
        }

        setUser(currentUser);

        // 2. Get user's profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
        }

        setProfile(profileData);

        // 3. Get crops belonging to this farmer
        const { data: cropData, error: cropError } = await supabase
          .from("crops")
          .select("*")
          .eq("farmer_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (cropError) {
          console.error("Crop fetch error:", cropError);
          setError(`Crops load nahi hui: ${cropError.message}`);
          setCrops([]);
        } else {
          setCrops(cropData || []);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Dashboard load nahi ho paya.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    navigate("/login");
  };

  // --------------------------------------------------
  // HELPER FUNCTIONS
  // --------------------------------------------------

  const getCropEmoji = (crop) => {
    const name = String(
      crop.crop_name ||
        crop.name ||
        crop.crop ||
        crop.title ||
        ""
    ).toLowerCase();

    if (name.includes("gehun") || name.includes("wheat")) return "🌾";
    if (name.includes("tamatar") || name.includes("tomato")) return "🍅";
    if (name.includes("aaloo") || name.includes("potato")) return "🥔";
    if (name.includes("pyaaz") || name.includes("onion")) return "🧅";
    if (name.includes("gobhi") || name.includes("cauliflower")) return "🥦";
    if (name.includes("mirch") || name.includes("chilli")) return "🌶️";
    if (name.includes("seb") || name.includes("apple")) return "🍎";
    if (name.includes("kela") || name.includes("banana")) return "🍌";

    return "🌱";
  };

  const getCropName = (crop) => {
    return (
      crop.crop_name ||
      crop.name ||
      crop.crop ||
      crop.title ||
      "Unknown Crop"
    );
  };

  const getQuantity = (crop) => {
    const quantity = crop.quantity ?? crop.qty ?? "-";
    const unit = crop.unit ? ` ${crop.unit}` : "";

    return `${quantity}${unit}`;
  };

  const getPrice = (crop) => {
    const price = crop.price ?? crop.crop_price ?? crop.selling_price;

    if (price === null || price === undefined || price === "") {
      return "Price not set";
    }

    return `₹${Number(price).toLocaleString("en-IN")}${
      crop.unit ? `/${crop.unit}` : ""
    }`;
  };

  const getStatus = (crop) => {
    return crop.status || "active";
  };

  const getStatusLabel = (status) => {
    if (status === "sold") return "Bik Gaya";
    if (status === "pending") return "Pending";
    return "Active";
  };

  const getStatusVariant = (status) => {
    if (status === "active") return "default";
    if (status === "sold") return "secondary";
    return "outline";
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌱</div>
          <p className="text-muted-foreground">
            Dashboard load ho raha hai...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // USER NAME
  // --------------------------------------------------

  const userName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Kisan";

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-background">

      {/* ================= HEADER ================= */}
      <header className="gradient-hero text-primary-foreground px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Sprout className="h-6 w-6" />
            </div>

            <h1 className="text-xl font-bold">
              Apna Kheti
            </h1>
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

      {/* ================= WELCOME ================= */}
      <div className="gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="animate-fade-up">

              <h2 className="text-2xl sm:text-3xl font-bold">
                Namaste, {userName} ji! 🙏
              </h2>

              <p className="text-primary-foreground/80 mt-1">
                Aapka aaj ka dashboard — sab kuch ek nazar mein
              </p>

            </div>

            <div className="flex gap-2 self-start flex-wrap">

              <Link to="/ai-price">
                <Button className="gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Brain className="h-5 w-5" />
                  AI Suggestions
                </Button>
              </Link>

              <Link to="/farmer/add-crop">
                <Button className="gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4" />
                  Nayi Fasal
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

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-8 space-y-6">

        {/* ERROR */}
        {error && (
          <div className="p-4 rounded-xl border border-red-300 bg-red-50 text-red-600">
            {error}
          </div>
        )}

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up">

          <StatCard
            title="Total Fasalein"
            value={String(crops.length)}
            icon={Wheat}
            trend={
              crops.length > 0
                ? `${crops.length} crop listing${crops.length > 1 ? "s" : ""}`
                : "Abhi koi fasal nahi"
            }
          />

          <StatCard
            title="Active Orders"
            value="0"
            icon={Package}
            trend="Orders yahan dikhenge"
          />

          <StatCard
            title="Total Kamaai"
            value="₹0"
            icon={IndianRupee}
            trend="Sales hone ke baad update hoga"
          />

          <StatCard
            title="AI Suggestions"
            value="2"
            icon={Brain}
            trend="AI market insights"
          />

        </div>

        {/* ================= CHATBOT ================= */}
        <div className="fixed bottom-6 right-6 z-50 group">

          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-card text-foreground text-xs font-bold px-4 py-2 rounded-xl shadow-2xl border border-border whitespace-nowrap">
              Kisan Sahayak AI 🌾
            </div>
          </div>

          <Link to="/Analytics/Chatbot">
            <button
              className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/40 hover:scale-110 transition-all duration-300 gradient-primary text-primary-foreground"
            >

              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

              <div className="relative z-10">
                <Brain className="h-7 w-7 animate-pulse" />

                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
              </div>

            </button>
          </Link>

        </div>

        {/* ================= CROPS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2 glass-card rounded-2xl animate-fade-up-delay">

            <CardHeader className="flex flex-row items-center justify-between pb-3">

              <CardTitle className="text-lg font-bold">
                🌾 Aapki Fasalein
              </CardTitle>

              <Link to="/farmer/my-crops">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Sab Dekhein
                </Button>
              </Link>

            </CardHeader>

            <CardContent className="space-y-3">

              {crops.length === 0 ? (

                <div className="text-center py-10">

                  <div className="text-5xl mb-3">
                    🌱
                  </div>

                  <h3 className="font-semibold text-lg">
                    Abhi koi fasal listed nahi hai
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Apni pehli fasal market mein list karein.
                  </p>

                  <Link to="/farmer/add-crop">
                    <Button className="gap-2 rounded-xl">
                      <Plus className="h-4 w-4" />
                      Nayi Fasal Add Karein
                    </Button>
                  </Link>

                </div>

              ) : (

                crops.map((crop) => {

                  const status = getStatus(crop);

                  return (
                    <div
                      key={crop.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/70 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-3xl">
                          {getCropEmoji(crop)}
                        </span>

                        <div>

                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {getCropName(crop)}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {getQuantity(crop)}
                          </p>

                        </div>

                      </div>

                      <div className="text-right flex items-center gap-3">

                        <span className="font-bold text-foreground">
                          {getPrice(crop)}
                        </span>

                        <Badge
                          variant={getStatusVariant(status)}
                          className="rounded-lg"
                        >
                          {getStatusLabel(status)}
                        </Badge>

                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />

                      </div>

                    </div>
                  );
                })
              )}

            </CardContent>

          </Card>

          {/* ================= AI SUGGESTIONS ================= */}
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

              <div className="p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-2 mb-2">

                  <span className="font-bold text-foreground">
                    Market Insight
                  </span>

                  <Badge
                    variant="outline"
                    className="text-xs rounded-lg"
                  >
                    🤖 AI
                  </Badge>

                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apni fasal ka current market price check karne ke liye AI Price Suggestion use karein.
                </p>

              </div>

              <div className="p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-200">

                <div className="flex items-center gap-2 mb-2">

                  <span className="font-bold text-foreground">
                    Smart Selling
                  </span>

                  <Badge
                    variant="default"
                    className="text-xs rounded-lg"
                  >
                    💡 Tip
                  </Badge>

                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Demand aur market trend dekhkar apni fasal ka price decide karein.
                </p>

              </div>

              <Card className="gradient-primary border-0 rounded-xl overflow-hidden">

                <CardContent className="p-4">

                  <div className="flex items-start gap-3">

                    <div className="p-2 rounded-lg bg-primary-foreground/15">
                      <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    </div>

                    <div>

                      <p className="font-semibold text-primary-foreground text-sm">
                        📈 Market Trend
                      </p>

                      <p className="text-xs text-primary-foreground/80 mt-1 leading-relaxed">
                        AI based market insights yahan dikhaye jayenge.
                      </p>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </CardContent>

          </Card>

        </div>

        {/* ================= DEMAND OVERVIEW ================= */}
        <Card className="glass-card rounded-2xl animate-fade-up-delay-2">

          <CardHeader className="pb-3">

            <CardTitle className="text-lg font-bold">
              📊 Demand Overview
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              {[
                {
                  label: "Gehun Demand",
                  value: "High 🔥",
                  color: "text-primary",
                  bg: "bg-primary/5 border-primary/20",
                },
                {
                  label: "Tamatar Demand",
                  value: "Medium ⚡",
                  color: "text-secondary",
                  bg: "bg-secondary/5 border-secondary/20",
                },
                {
                  label: "Aaloo Demand",
                  value: "Low 📉",
                  color: "text-muted-foreground",
                  bg: "bg-muted/50 border-border",
                },
                {
                  label: "Pyaaz Demand",
                  value: "High 🔥",
                  color: "text-primary",
                  bg: "bg-primary/5 border-primary/20",
                },
              ].map((item, i) => (

                <div
                  key={i}
                  className={`text-center p-5 rounded-xl border ${item.bg} hover:shadow-md transition-all duration-200`}
                >

                  <p className="text-sm text-muted-foreground font-medium">
                    {item.label}
                  </p>

                  <p className={`font-bold text-lg mt-2 ${item.color}`}>
                    {item.value}
                  </p>

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