import { Brain, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Python demand surging",
    desc: "Python-related roles increased 34% this quarter. Students should prioritize data science and automation skills.",
    type: "trend" as const,
  },
  {
    icon: Lightbulb,
    title: "Full-stack roles dominating",
    desc: "73% of new openings require both frontend and backend skills. React + Node.js is the most requested stack.",
    type: "insight" as const,
  },
  {
    icon: AlertTriangle,
    title: "Declining demand for manual testing",
    desc: "Manual QA roles dropped 22%. Automation testing (Selenium, Cypress) skills are now essential.",
    type: "warning" as const,
  },
  {
    icon: TrendingUp,
    title: "Cloud certifications valued",
    desc: "Candidates with AWS/Azure certifications receive 28% higher starting packages on average.",
    type: "trend" as const,
  },
];

const typeStyles = {
  trend: { bg: "hsl(var(--success) / 0.08)", color: "hsl(var(--success))" },
  insight: { bg: "hsl(20 12% 50% / 0.1)", color: "hsl(20 12% 50%)" },
  warning: { bg: "hsl(var(--danger) / 0.08)", color: "hsl(var(--danger))" },
};

export default function AIInsights() {
  return (
    <div className="stat-card animate-reveal-up" style={{ animationDelay: "560ms" }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "hsl(var(--accent) / 0.12)" }}>
          <Brain className="w-4 h-4" style={{ color: "hsl(var(--accent))" }} />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">AI Insights</h3>
          <p className="text-[12px] text-muted-foreground">Generated from placement + job market data</p>
        </div>
      </div>
      <div className="space-y-3">
        {insights.map((item, i) => {
          const style = typeStyles[item.type];
          return (
            <div key={i} className="p-3.5 rounded-xl border border-border/50 hover:border-border transition-colors duration-150">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: style.bg }}>
                  <item.icon className="w-4 h-4" style={{ color: style.color }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
