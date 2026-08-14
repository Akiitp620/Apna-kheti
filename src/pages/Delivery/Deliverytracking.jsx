import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent } from "@/Components/Ui/Card";
import { Badge } from "@/Components/Ui/Badge";
import { ArrowLeft, MapPin, Phone, CheckCircle2, Circle, Package, Truck, Home } from "lucide-react";

const steps = [
  { id: 1, label: "Order Accept Kiya", time: "10:30 AM", done: true, icon: CheckCircle2 },
  { id: 2, label: "Pickup Complete", time: "11:15 AM", done: true, icon: Package },
  { id: 3, label: "On the Way", time: "11:45 AM", done: true, icon: Truck },
  { id: 4, label: "Delivered", time: "—", done: false, icon: Home },
];

const DeliveryTracking = () => {
  const [currentStep, setCurrentStep] = useState(3);

  const handleUpdateStatus = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/delivery/dashboard">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Delivery Tracking</h1>
            <p className="text-xs text-muted-foreground">Order #DEL-001</p>
          </div>
          <Badge className="rounded-full bg-primary/10 text-primary border-primary/20">Active</Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Map placeholder */}
        <div className="w-full h-48 rounded-2xl bg-primary/5 border border-border/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/3 w-32 h-0.5 bg-primary rotate-12" />
            <div className="absolute top-1/3 left-1/4 w-48 h-0.5 bg-primary -rotate-6" />
            <div className="absolute top-1/2 left-1/2 w-40 h-0.5 bg-primary rotate-45" />
          </div>
          <div className="text-center z-10">
            <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Live Map Coming Soon</p>
          </div>
        </div>

        {/* Order Info */}
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-3xl">🌾</div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Organic Gehu - 2 Quintal</p>
              <p className="text-xs text-muted-foreground mt-0.5">Ramesh Kumar → Amit Sharma</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> Sundarpur → Cantt, Varanasi
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Steps */}
        <Card className="border-border/50">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">Delivery Status</h3>
            <div className="space-y-0">
              {steps.map((step, i) => {
                const isComplete = step.id <= currentStep;
                const isCurrent = step.id === currentStep;
                return (
                  <div key={step.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isComplete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                        {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`w-0.5 h-10 ${step.id < currentStep ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className={`font-medium text-sm ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.id <= currentStep ? step.time : "Pending"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 rounded-xl">
            <Phone className="h-4 w-4 mr-2" /> Kisan ko Call
          </Button>
          <Button variant="outline" className="h-12 rounded-xl">
            <Phone className="h-4 w-4 mr-2" /> Buyer ko Call
          </Button>
        </div>

        {currentStep < 4 && (
          <Button onClick={handleUpdateStatus} className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
            Status Update Karein →
          </Button>
        )}

        {currentStep === 4 && (
          <div className="text-center py-4 space-y-2">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
            <p className="font-bold text-foreground">Delivery Complete! 🎉</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryTracking;
