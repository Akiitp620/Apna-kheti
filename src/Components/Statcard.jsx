import { cn } from "@/Lib/Utils";
import PropTypes from "prop-types";

const StatCard = ({ title, value, icon, trend, className }) => {
  const Icon = icon;

  return (
    <div className={cn("glass-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-default", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && <p className="text-xs text-primary font-semibold">{trend}</p>}
        </div>

        <div className="p-3 rounded-xl gradient-primary shadow-md">
          {Icon && <Icon className="h-5 w-5 text-white" />}
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  trend: PropTypes.string,
  className: PropTypes.string,
};

export default StatCard;
