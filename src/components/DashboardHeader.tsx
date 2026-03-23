import { Search, Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-8 animate-fade-in">
      <div>
        <h1 className="text-[24px] font-bold text-foreground leading-tight">Dashboard</h1>
        <p className="text-[14px] text-muted-foreground mt-1">Track placements, analyze trends, and get AI insights</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-[220px] rounded-xl bg-card border border-border pl-10 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
          />
        </div>
        <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-[18px] h-[18px]" />
        </button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold text-white"
          style={{ background: "hsl(var(--accent))" }}>
          AK
        </div>
      </div>
    </header>
  );
}
