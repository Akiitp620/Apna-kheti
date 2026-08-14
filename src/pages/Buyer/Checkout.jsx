import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-5 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Order Confirm Ho Gaya! 🎉</h2>
          <p className="text-muted-foreground">Aapka order #KCO-2024-0847 successfully place ho gaya hai</p>
          <p className="text-sm text-muted-foreground">Kisan jaldi hi aapke order ko accept karega</p>
          <div className="flex flex-col gap-3 pt-4">
            <Link to="/marketplace">
              <Button className="w-full rounded-xl gradient-primary text-primary-foreground">Aur Khareedein</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full rounded-xl">Home Jaayein</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Checkout</h1>
            <p className="text-xs text-muted-foreground">Step {step} of 2</p>
          </div>
        </div>
      </header>

      {/* Steps indicator */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-6 space-y-5">
        {step === 1 && (
          <>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Poora Naam</Label>
                    <Input placeholder="Apna naam" className="h-11 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Phone Number</Label>
                    <Input placeholder="9876543210" className="h-11 rounded-xl bg-muted/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Pura Address</Label>
                  <Input placeholder="Ghar/Office ka address" className="h-11 rounded-xl bg-muted/50" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">City</Label>
                    <Input placeholder="Sheher" className="h-11 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">State</Label>
                    <Input placeholder="Rajya" className="h-11 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">PIN Code</Label>
                    <Input placeholder="221001" className="h-11 rounded-xl bg-muted/50" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={() => setStep(2)} className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              Aage Badhein →
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "cod", label: "Cash on Delivery", icon: Truck, desc: "Delivery ke waqt payment" },
                  { id: "upi", label: "UPI Payment", icon: CreditCard, desc: "Google Pay, PhonePe, Paytm" },
                  { id: "card", label: "Card Payment", icon: CreditCard, desc: "Debit / Credit Card" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-border"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${paymentMethod === method.id ? "bg-primary/10" : "bg-muted/50"}`}>
                      <method.icon className={`h-5 w-5 ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-border/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items Total</span>
                  <span>₹5,055</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="border-t border-border/50 pt-2 flex justify-between">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-primary text-lg">₹5,055</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 rounded-xl">← Peeche</Button>
              <Button onClick={() => setStep(3)} className="flex-1 h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                Order Place Karein
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;
