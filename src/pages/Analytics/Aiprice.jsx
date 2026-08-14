import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Minus, Sparkles, BarChart3 } from "lucide-react";

const predictions = [
  { crop: "Gehu (Wheat)", emoji: "🌾", current: 2200, predicted: 2450, trend: "up", confidence: 92, change: "+₹250" },
  { crop: "Dhan (Rice)", emoji: "🌾", current: 1800, predicted: 1950, trend: "up", confidence: 88, change: "+₹150" },
  { crop: "Tamatar", emoji: "🍅", current: 40, predicted: 35, trend: "down", confidence: 78, change: "-₹5" },
  { crop: "Pyaaz (Onion)", emoji: "🧅", current: 25, predicted: 30, trend: "up", confidence: 85, change: "+₹5" },
  { crop: "Aaloo (Potato)", emoji: "🥔", current: 18, predicted: 18, trend: "stable", confidence: 90, change: "₹0" },
  { crop: "Dhaniya", emoji: "🌿", current: 60, predicted: 75, trend: "up", confidence: 82, change: "+₹15" },
];

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor = { up: "text-primary", down: "text-destructive", stable: "text-muted-foreground" };

const AIPrice = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/farmer/dashboard">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">AI Price Prediction 🤖</h1>
            <p className="text-xs text-muted-foreground">Smart mandi rate analysis</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* AI Banner */}
        <Card className="border-0 gradient-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4 relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <Brain className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Powered Predictions</h2>
              <p className="text-sm opacity-80">Mandi data + Weather + Demand se calculated</p>
            </div>
          </CardContent>
        </Card>

        {/* Predictions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Price Forecast
            </h2>
            <Badge variant="secondary" className="rounded-full text-xs">Next 7 Days</Badge>
          </div>

          {predictions.map((p) => {
            // ✅ FIXED (removed javascript casting)
            const Icon = trendIcon[p.trend];

            return (
              <Card key={p.crop} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-2xl">
                    {p.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{p.crop}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Current: ₹{p.current}</span>
                      <span className="text-xs">→</span>
                      <span className="text-sm font-bold text-primary">₹{p.predicted}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    {/* ✅ FIXED */}
                    <div className={`flex items-center gap-1 justify-end ${trendColor[p.trend]}`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-bold">{p.change}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{p.confidence}% sure</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart placeholder */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Price Trend Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-xl bg-muted/30 border border-border/30 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">📊 Interactive chart coming soon</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIPrice;