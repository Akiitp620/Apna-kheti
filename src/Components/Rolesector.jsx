import { cn } from "@/Lib/Utils";
import { Sprout, ShoppingCart, Truck } from "lucide-react";

const roles = [
  { id: "farmer", label: "🌾 Kisan", icon: Sprout, description: "Apni fasal bechein" },
  { id: "buyer", label: "🛒 Khareedaar", icon: ShoppingCart, description: "Seedha kisan se khareedein" },
  { id: "delivery", label: "🚚 Delivery", icon: Truck, description: "Delivery partner banein" },
];

const RoleSelector = ({ selectedRole, onRoleChange, variant = "chips" }) => {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange?.(role.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
              selectedRole === role.id
                ? "border-primary bg-primary/10 shadow-lg scale-[1.03]"
                : "border-border bg-card hover:border-primary/40 hover:shadow-sm hover:scale-[1.01]"
            )}
          >
            <role.icon className={cn("h-8 w-8", selectedRole === role.id ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("font-semibold text-sm", selectedRole === role.id ? "text-primary" : "text-foreground")}>
              {role.label}
            </span>
            <span className="text-xs text-muted-foreground text-center">{role.description}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          onClick={() => onRoleChange?.(role.id)}
          className={cn(
            "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border",
            selectedRole === role.id
              ? "gradient-primary text-primary-foreground border-transparent shadow-lg scale-105"
              : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-sm"
          )}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;