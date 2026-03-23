import { Users, TrendingUp, IndianRupee, Building2 } from "lucide-react";

const stats = [
  {
    label: "Placement Rate",
    value: "87.3%",
    change: "+4.2%",
    positive: true,
    subtitle: "vs last year",
    icon: TrendingUp,
  },
  {
    label: "Students Placed",
    value: "1,247",
    change: "+12.8%",
    positive: true,
    subtitle: "vs last year",
    icon: Users,
  },
  {
    label: "Avg. Package",
    value: "₹8.4L",
    change: "+18.5%",
    positive: true,
    subtitle: "vs last year",
    icon: IndianRupee,
  },
  {
    label: "Top Recruiter",
    value: "TCS",
    change: "142 offers",
    positive: true,
    subtitle: "this season",
    icon: Building2,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="stat-card animate-reveal-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-[13px] font-medium">{stat.label}</span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary">
              <stat.icon className="w-[18px] h-[18px] text-foreground/70" />
            </div>
          </div>
          <div className="text-[28px] font-bold tracking-tight leading-none text-foreground">
            {stat.value}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="text-[12px] font-semibold px-1.5 py-0.5 rounded"
              style={{
                color: stat.positive ? "hsl(var(--success))" : "hsl(var(--danger))",
                background: stat.positive ? "hsl(var(--success) / 0.1)" : "hsl(var(--danger) / 0.1)",
              }}
            >
              {stat.change}
            </span>
            <span className="text-[12px] text-muted-foreground">{stat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
