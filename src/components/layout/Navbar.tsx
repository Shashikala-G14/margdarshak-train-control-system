import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Train Simulation", href: "/simulation" },
  { name: "AI Decision Support", href: "/ai-decision" },
  { name: "Live Train Status", href: "/live-status" },
  { name: "Weather Impact", href: "/weather-impact" },
  { name: "Margdarshak Assistant", href: "/assistant" },
];

export const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border shadow-card h-20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Margdarshak</h1>
                <p className="text-xs text-muted-foreground">Railway Control System</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-railway-primary text-railway-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-train-moving rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};