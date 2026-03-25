import { Users, TrendingUp, IndianRupee, Building2, Loader2 } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { useCompanies } from "@/hooks/useCompanies";

export default function StatCards() {
  const { students, loading: loading1 } = useStudents();
  const { companies, loading: loading2 } = useCompanies();

  if (loading1 || loading2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card h-[132px] animate-pulse bg-secondary/50 rounded-xl" />
        ))}
      </div>
    );
  }

  const placed = students.filter((s) => s.status === "Placed").length;
  const placementRate = students.length ? Math.round((placed / students.length) * 100) : 0;
  
  let totalPackage = 0;
  let packageCount = 0;
  students.forEach((s) => {
    if (s.package && s.package !== "—") {
      const val = parseFloat(s.package.replace(/[^0-9.]/g, ''));
      if (!isNaN(val)) {
        totalPackage += val;
        packageCount++;
      }
    }
  });
  const avgPackage = packageCount > 0 ? (totalPackage / packageCount).toFixed(1) : "0.0";
  
  const topCompany = companies.length > 0 ? [...companies].sort((a, b) => b.offers - a.offers)[0] : null;

  const stats = [
    {
      label: "Placement Rate",
      value: `${placementRate}%`,
      change: "Live",
      positive: true,
      subtitle: "from database",
      icon: TrendingUp,
    },
    {
      label: "Students Placed",
      value: placed.toString(),
      change: "Live",
      positive: true,
      subtitle: "from database",
      icon: Users,
    },
    {
      label: "Avg. Package",
      value: `₹${avgPackage}L`,
      change: "Live",
      positive: true,
      subtitle: "from database",
      icon: IndianRupee,
    },
    {
      label: "Top Recruiter",
      value: topCompany ? topCompany.name : "N/A",
      change: topCompany ? `${topCompany.offers} offers` : "0 offers",
      positive: true,
      subtitle: "from database",
      icon: Building2,
    },
  ];

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
