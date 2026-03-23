import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";

const skills = [
  { name: "Python", demand: 92, category: "Programming", trend: "up", students: 834, change: "+12%" },
  { name: "React.js", demand: 85, category: "Frontend", trend: "up", students: 621, change: "+18%" },
  { name: "Java", demand: 78, category: "Programming", trend: "stable", students: 712, change: "+2%" },
  { name: "SQL", demand: 74, category: "Database", trend: "stable", students: 690, change: "+3%" },
  { name: "Machine Learning", demand: 68, category: "AI/ML", trend: "up", students: 345, change: "+34%" },
  { name: "Cloud (AWS/Azure)", demand: 63, category: "DevOps", trend: "up", students: 278, change: "+28%" },
  { name: "Data Analysis", demand: 58, category: "Analytics", trend: "up", students: 412, change: "+15%" },
  { name: "Node.js", demand: 54, category: "Backend", trend: "up", students: 389, change: "+22%" },
  { name: "TypeScript", demand: 49, category: "Frontend", trend: "up", students: 256, change: "+41%" },
  { name: "Manual Testing", demand: 28, category: "QA", trend: "down", students: 198, change: "-22%" },
  { name: "PHP", demand: 22, category: "Backend", trend: "down", students: 145, change: "-18%" },
  { name: "Angular", demand: 35, category: "Frontend", trend: "stable", students: 187, change: "-5%" },
];

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
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[
            { label: "Skills Tracked", value: skills.length, change: "across categories" },
            { label: "Top Skill", value: "Python", change: "92% demand index" },
            { label: "Fastest Growing", value: "TypeScript", change: "+41% this quarter" },
            { label: "Declining Skill", value: "Manual QA", change: "-22% demand" },
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
              const Icon = trendIcon[skill.trend as keyof typeof trendIcon];
              return (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        style={{ background: `${categoryColors[skill.category]}22`, color: categoryColors[skill.category] }}>
                        {skill.category}
                      </span>
                      <span className="text-[13px] font-medium text-foreground">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-semibold flex items-center gap-1"
                        style={{ color: trendColor[skill.trend as keyof typeof trendColor] }}>
                        <Icon className="w-3.5 h-3.5" />
                        {skill.change}
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
                  <p className="text-[11px] text-muted-foreground mt-1">{skill.students.toLocaleString()} students trained</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
