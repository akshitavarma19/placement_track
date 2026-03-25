import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Zap, TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColor = {
  up: "hsl(var(--success))",
  down: "hsl(var(--danger))",
  stable: "hsl(var(--muted-foreground))",
};

const categoryColors: Record<string, string> = {
  Programming: "#6366f1",
  Frontend: "#3b82f6",
  Backend: "#8b5cf6",
  Database: "#0891b2",
  "AI/ML": "#ec4899",
  DevOps: "#f59e0b",
  Analytics: "#10b981",
  QA: "#ef4444",
};

export default function Skills() {
  const { skills, loading } = useSkills();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
          <DashboardHeader />
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  const topSkill = skills.length > 0 ? skills.sort((a, b) => b.demand - a.demand)[0] : null;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[
            { label: "Skills Tracked", value: skills.length, change: "across categories" },
            { label: "Top Skill", value: topSkill?.name || "N/A", change: topSkill ? `${topSkill.demand}% demand index` : "No data" },
            { label: "Growth Trends", value: "Live", change: "from database" },
            { label: "Students Trained", value: skills.reduce((acc, s) => acc + s.students_count, 0).toLocaleString(), change: "total enrollment" },
          ].map((s, i) => (
            <div key={s.label} className="stat-card animate-reveal-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-[13px] font-medium">{s.label}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary">
                  <Zap className="w-[18px] h-[18px] text-foreground/70" />
                </div>
              </div>
              <div className="text-[24px] font-bold tracking-tight text-foreground">{s.value}</div>
              <p className="mt-2 text-[12px] text-muted-foreground">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="stat-card mt-6 animate-reveal-up" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-foreground">Skill Demand Index</h3>
              <p className="text-[13px] text-muted-foreground mt-0.5">Based on latest job postings & hiring trends</p>
            </div>
          </div>
          <div className="space-y-5">
            {skills.map((skill) => {
              const Icon = trendIcon[skill.trend as keyof typeof trendIcon] || Minus;
              return (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        style={{ background: `${categoryColors[skill.category] || "#94a3b8"}22`, color: categoryColors[skill.category] || "#94a3b8" }}>
                        {skill.category}
                      </span>
                      <span className="text-[13px] font-medium text-foreground">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-semibold flex items-center gap-1"
                        style={{ color: trendColor[skill.trend as keyof typeof trendColor] || "inherit" }}>
                        <Icon className="w-3.5 h-3.5" />
                        {skill.growth_rate}
                      </span>
                      <span className="text-[12px] font-semibold text-muted-foreground tabular-nums w-8 text-right">{skill.demand}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${skill.demand}%`,
                        background: skill.demand > 80 ? "hsl(var(--success))" : skill.demand > 60 ? "hsl(var(--chart-2))" : skill.demand > 40 ? "hsl(var(--chart-4))" : "hsl(var(--danger))",
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{skill.students_count.toLocaleString()} students trained</p>
                </div>
              );
            })}
            {skills.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No skill data found in database.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

