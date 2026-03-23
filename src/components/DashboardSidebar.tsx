import { LayoutDashboard, Users, Building2, Zap, Brain, TrendingUp, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
  const { signOut } = useAuth();

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
      <div className="px-3 pb-6 flex flex-col gap-1">
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
        
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 text-red-400 hover:bg-red-400/10 hover:text-red-300 mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
