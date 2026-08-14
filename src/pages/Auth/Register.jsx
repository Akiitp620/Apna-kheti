import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import RoleSelector from "@/Components/Rolesector";
import { Sprout, Eye, EyeOff, Shield, Zap, TrendingUp, Truck } from "lucide-react";

const features = [
  { icon: TrendingUp, text: "AI se sahi price suggestions" },
  { icon: Truck, text: "Real-time delivery tracking" },
  { icon: Shield, text: "Secure & safe payments" },
  { icon: Zap, text: "Seedha Kisan se Khareedaar" },
];

const Register = () => {
  const [role, setRole] = useState("farmer");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[12%] left-[12%] text-8xl animate-float opacity-20">🌾</div>
          <div className="absolute top-[45%] right-[10%] text-7xl animate-float-delay opacity-20">🥕</div>
          <div className="absolute bottom-[12%] left-[18%] text-9xl animate-float-slow opacity-20">🌿</div>
          <div className="absolute bottom-[40%] right-[18%] text-6xl animate-float opacity-15">🍅</div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
        
        <div className="z-10 px-12 animate-fade-up">
          <h1 className="text-5xl font-bold text-primary-foreground mb-3 leading-tight">
            Apna kheti<br />
            <span className="text-accent text-3xl font-medium">par judein aaj hi!</span>
          </h1>
          <p className="text-primary-foreground/70 text-base mb-10 max-w-sm">
            Apni fasal ka sahi daam paayein aur seedha buyers se connect karein
          </p>
          
          <div className="space-y-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="p-2 rounded-lg bg-accent/20">
                  <f.icon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-primary-foreground/90 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6 animate-fade-up">
          {/* Mobile logo */}
          <div className="text-center lg:hidden">
            <div className="inline-flex items-center gap-2.5 mb-2 px-4 py-2 rounded-2xl bg-primary/5">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gradient">Kisan Connect</h1>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Naya Account Banayein 🌱</h2>
            <p className="text-muted-foreground">Apni details bharein aur shuru karein</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Role Selector */}
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold">Aap kaun hain? (Role chunein)</Label>
              <RoleSelector selectedRole={role} onRoleChange={setRole} variant="cards" />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Poora Naam</Label>
              <Input id="name" placeholder="Apna naam likkhein" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card transition-colors" />
            </div>

            {/* Email/Phone */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email ya Phone Number</Label>
              <Input id="email" placeholder="example@email.com ya 9876543210" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card transition-colors" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mazboot password banayein"
                  className="h-12 pr-10 rounded-xl bg-muted/50 border-border/60 focus:bg-card transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Link to="/login">
              <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Account Banayein →
            </Button>
            </Link>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pehle se account hai?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login karein
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
