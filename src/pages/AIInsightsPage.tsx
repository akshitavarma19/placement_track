import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Brain, TrendingUp, Lightbulb, AlertTriangle, Zap, Target } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Python demand surging",
    desc: "Python-related roles increased 34% this quarter. Students should prioritize data science and automation skills. Encourage participation in Kaggle competitions and open-source projects.",
    type: "trend",
    impact: "High",
    action: "Launch Python + Data Science bootcamp",
  },
  {
    icon: Lightbulb,
    title: "Full-stack roles dominating",
    desc: "73% of new openings require both frontend and backend skills. React + Node.js is the most requested stack. MERN stack proficiency is increasingly listed as mandatory.",
    type: "insight",
    impact: "High",
    action: "Integrate MERN stack into core curriculum",
  },
  {
    icon: AlertTriangle,
    title: "Declining demand for manual testing",
    desc: "Manual QA roles dropped 22%. Automation testing (Selenium, Cypress) skills are now essential. Students in QA tracks should pivot to automation-first mindset.",
    type: "warning",
    impact: "Medium",
    action: "Update QA syllabus to automation-first",
  },
  {
    icon: TrendingUp,
    title: "Cloud certifications valued",
    desc: "Candidates with AWS/Azure certifications receive 28% higher starting packages on average. Partnering with cloud providers for discounted exam vouchers could boost outcomes.",
    type: "trend",
    impact: "High",
    action: "Partner with AWS/Azure for student certs",
  },
  {
    icon: Zap,
    title: "Product companies increasing visits",
    desc: "Product-based companies (Google, Microsoft, Amazon) drove 37.5% more offers year-over-year. Focus on DS/Algo preparation and system design for final-year students.",
    type: "insight",
    impact: "High",
    action: "Run intensive DSA prep for final year",
  },
  {
    icon: Target,
    title: "4-day offer window gap",
    desc: "Students who accept offers within 4 days have 18% higher on-boarding rate. Reducing the decision window and counselling support could improve offer acceptance.",
    type: "insight",
    impact: "Low",
    action: "Add career counselling touchpoints",
  },
  {
    icon: AlertTriangle,
    title: "Low female student placement rate",
    desc: "Female students have 6% lower placement rate than male peers in core engineering branches. Targeted networking events with women-friendly companies could close the gap.",
    type: "warning",
    impact: "Medium",
    action: "Host gender-inclusive placement drive",
  },
];

const typeStyles = {
  trend: { bg: "hsl(var(--success) / 0.08)", color: "hsl(var(--success))", label: "Opportunity" },
  insight: { bg: "hsl(20 12% 50% / 0.1)", color: "hsl(20 12% 50%)", label: "Insight" },
  warning: { bg: "hsl(var(--danger) / 0.08)", color: "hsl(var(--danger))", label: "Alert" },
};

const impactColor: Record<string, string> = {
  High: "#6366f1",
  Medium: "#f59e0b",
  Low: "#10b981",
};

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        {/* Header card */}
        <div className="stat-card mt-2 animate-reveal-up flex items-center gap-4" style={{ animationDelay: "0ms" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "hsl(var(--accent) / 0.12)" }}>
            <Brain className="w-6 h-6" style={{ color: "hsl(var(--accent))" }} />
          </div>
          <div>
            <h2 className="text-[17px] font-semibold text-foreground">AI-Generated Placement Insights</h2>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Analysed from {insights.length} data points across placement records, job postings, and market signals.
              Last updated: March 2024
            </p>
          </div>
          <div className="ml-auto flex gap-3 shrink-0">
            {["Opportunities", "Alerts", "Insights"].map((tag) => (
              <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {insights.map((item, i) => {
            const style = typeStyles[item.type as keyof typeof typeStyles];
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="stat-card animate-reveal-up hover:shadow-lg transition-shadow duration-200"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: style.bg }}>
                    <Icon className="w-5 h-5" style={{ color: style.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[14px] font-semibold text-foreground">{item.title}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{ background: style.bg, color: style.color }}>
                        {style.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Impact:</span>
                    <span className="text-[11px] font-bold" style={{ color: impactColor[item.impact] }}>
                      {item.impact}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Suggested:</span>
                    <span className="text-[11px] font-medium text-foreground">{item.action}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
