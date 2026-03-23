import { LayoutDashboard, Users, Building2, Zap, Brain, TrendingUp, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: Building2, label: "Companies", path: "/companies" },
  { icon: Zap, label: "Skills", path: "/skills" },
  { icon: TrendingUp, label: "Trends", path: "/trends" },
  { icon: Brain, label: "AI Insights", path: "/ai-insights" },
];

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col"
      style={{ background: "hsl(var(--sidebar-bg))" }}>
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(var(--accent))" }}>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-[15px] font-semibold" style={{ color: "hsl(var(--sidebar-fg-active))" }}>
          PlaceTrack
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150"
              style={{
                color: isActive ? "hsl(var(--sidebar-fg-active))" : "hsl(var(--sidebar-fg))",
                background: isActive ? "hsl(var(--sidebar-accent))" : "transparent",
              }}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6">
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150"
          style={{
            color: location.pathname === "/settings" ? "hsl(var(--sidebar-fg-active))" : "hsl(var(--sidebar-fg))",
            background: location.pathname === "/settings" ? "hsl(var(--sidebar-accent))" : "transparent",
          }}
        >
          <Settings className="w-[18px] h-[18px]" />
          Settings
        </button>
      </div>
    </aside>
  );
}
