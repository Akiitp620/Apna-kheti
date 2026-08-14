import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import RoleSelector from "@/Components/Rolesector";
import { Sprout, Eye, EyeOff, Leaf } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient Illustration */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center relative overflow-hidden">
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[10%] text-8xl animate-float opacity-20">🌾</div>
          <div className="absolute top-[30%] right-[15%] text-7xl animate-float-delay opacity-20">🌻</div>
          <div className="absolute bottom-[15%] left-[15%] text-9xl animate-float-slow opacity-20">🚜</div>
          <div className="absolute bottom-[35%] right-[10%] text-6xl animate-float opacity-15">🌽</div>
          <div className="absolute top-[55%] left-[45%] text-8xl animate-float-delay opacity-15">🌱</div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
        
        <div className="text-center z-10 px-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
            <Leaf className="h-5 w-5 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">India ka #1 Farming Platform</span>
          </div>
          <h1 className="text-5xl font-bold text-primary-foreground mb-4 leading-tight">
            Apna<br />Kheti
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xs mx-auto">
            Kisan aur Khareedaar ko seedha jodne wala platform
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1.5">✅ Fresh Produce</span>
            <span className="flex items-center gap-1.5">✅ Fair Prices</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          {/* Mobile logo */}
          <div className="text-center lg:hidden">
            <div className="inline-flex items-center gap-2.5 mb-2 px-4 py-2 rounded-2xl bg-primary/5">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gradient">Kisan Connect</h1>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back! 👋</h2>
            <p className="text-muted-foreground">Apne account mein login karein</p>
          </div>

          <form
  className="space-y-5"
  onSubmit={(e) => {
  e.preventDefault();

  if (role === "farmer") {
    navigate("/farmer/dashboard");
  } else if (role === "buyer") {
    navigate("/marketplace");
  } else if (role === "delivery") {
    navigate("/delivery/dashboard");
  }
}}
>
            {/* Role Selector */}
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold">Aap kaun hain?</Label>
              <RoleSelector selectedRole={role} onRoleChange={setRole} />
            </div>

            {/* Email/Phone */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email ya Phone Number</Label>
              <Input
                id="email"
                placeholder="example@email.com ya 9876543210"
                className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline font-medium">
                  Password bhool gaye?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Apna password dalein"
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

            <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Login Karein →
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground">ya</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full h-12 rounded-xl font-medium">
              📱 OTP se Login Karein
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Account nahi hai?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register karein
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
