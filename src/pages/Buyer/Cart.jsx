import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent } from "@/Components/Ui/Card";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const initialItems = [
  { id: 1, name: "Organic Gehu", farmer: "Ramesh Kumar", price: 2400, qty: 2, unit: "quintal", emoji: "🌾" },
  { id: 2, name: "Taze Tamatar", farmer: "Suresh Yadav", price: 35, qty: 5, unit: "kg", emoji: "🍅" },
  { id: 3, name: "Hara Dhaniya", farmer: "Priya Devi", price: 60, qty: 3, unit: "kg", emoji: "🌿" },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) => {
    setItems(items.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
  {/* Background */}
  <div className="bg-blur-image cart-bg"></div>
  <div className="bg-overlay"></div>
    
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/marketplace">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Mera Cart</h1>
            <p className="text-xs text-muted-foreground">{items.length} items</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto" />
            <p className="text-lg font-semibold text-muted-foreground">Cart khaali hai</p>
            <Link to="/marketplace">
              <Button className="rounded-xl gradient-primary text-primary-foreground">Marketplace Dekhein</Button>
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <Card key={item.id} className="border-border/50 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-3xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.farmer}</p>
                    <p className="text-sm font-bold text-primary mt-1">₹{item.price}/{item.unit}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1 border border-border/50">
                      <button onClick={() => updateQty(item.id, -1)} className="p-0.5"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-0.5"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Summary */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                    <span className="font-medium">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="border-t border-border/50 pt-3 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">₹{total}</span>
                </div>
              </CardContent>
            </Card>

            <Link to="/checkout">
              <Button className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                Checkout Karein — ₹{total}
              </Button>
            </Link>
          </>
        )}
      </main>
    </div>
    </>
  );
};

export default Cart;
