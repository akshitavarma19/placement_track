import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Building2, Users, TrendingUp, CheckCircle, Loader2 } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";

const statusColor: Record<string, { color: string; bg: string }> = {
  Active: { color: "#3EA945", bg: "#3EA94520" },
  Completed: { color: "#928072", bg: "#92807220" },
  Upcoming: { color: "#E8A838", bg: "#E8A83820" },
};

export default function Companies() {
  const { companies, loading } = useCompanies();
  const active = companies.filter((c) => c.status === "Active").length;
  const totalOffers = companies.reduce((a, c) => a + c.offers, 0);

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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[
            { label: "Total Companies", value: companies.length, icon: Building2, change: "registered" },
            { label: "Active Recruiters", value: active, icon: CheckCircle, change: "currently hiring" },
            { label: "Total Offers", value: totalOffers, icon: Users, change: "this season" },
            { label: "Avg Offers/Co.", value: companies.length ? Math.round(totalOffers / companies.length) : 0, icon: TrendingUp, change: "per recruiter" },
          ].map((s, i) => (
            <div key={s.label} className="stat-card animate-reveal-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-[13px] font-medium">{s.label}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary">
                  <s.icon className="w-[18px] h-[18px] text-foreground/70" />
                </div>
              </div>
              <div className="text-[28px] font-bold tracking-tight text-foreground">{s.value}</div>
              <p className="mt-2 text-[12px] text-muted-foreground">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="stat-card mt-6 animate-reveal-up" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-semibold text-foreground">Recruiter Directory</h3>
            <span className="text-[13px] text-muted-foreground">{companies.length} companies</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  {["Company", "Sector", "Offers Made", "Avg Package", "Mode", "Status"].map((h) => (
                    <th key={h} className="text-left pb-3 pr-4 text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((c, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-[12px] font-bold text-foreground/60">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{c.sector}</td>
                    <td className="py-3 pr-4 font-semibold text-foreground">{c.offers}</td>
                    <td className="py-3 pr-4 font-semibold" style={{ color: "hsl(var(--success))" }}>{c.avg_package}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{c.mode}</td>
                    <td className="py-3">
                      <span className="text-[11px] font-semibold px-2 py-1 rounded-lg"
                        style={{ color: statusColor[c.status].color, background: statusColor[c.status].bg }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
