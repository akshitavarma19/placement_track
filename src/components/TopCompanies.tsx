import { useJobMarket } from "@/hooks/useJobMarket";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

const baseCompanies = [
  { name: "TCS", offers: 142, status: "Active", color: "#3EA945" },
  { name: "Infosys", offers: 98, status: "Active", color: "#3EA945" },
  { name: "Wipro", offers: 76, status: "Active", color: "#3EA945" },
  { name: "Cognizant", offers: 64, status: "Completed", color: "#928072" },
  { name: "Accenture", offers: 52, status: "Active", color: "#3EA945" },
  { name: "Capgemini", offers: 41, status: "Upcoming", color: "#E8A838" },
];

export default function TopCompanies() {
  const { data: jobs, isLoading } = useJobMarket();

  const companies = useMemo(() => {
    if (!jobs || jobs.length === 0) return baseCompanies;

    // Aggregate offers by company from real-time data
    const counts = jobs.reduce((acc: Record<string, number>, job) => {
      acc[job.companyName] = (acc[job.companyName] || 0) + 1;
      return acc;
    }, {});

    const sortedCompanies = Object.entries(counts)
      .map(([name, offers]) => ({
        name,
        offers,
        status: "Active" as const,
        color: "#3EA945"
      }))
      .sort((a, b) => b.offers - a.offers)
      .slice(0, 6);

    // If we have fewer than 6 real companies, pad with some base ones
    if (sortedCompanies.length < 6) {
      const existingNames = new Set(sortedCompanies.map(c => c.name));
      const padding = baseCompanies.filter(c => !existingNames.has(c.name)).slice(0, 6 - sortedCompanies.length);
      return [...sortedCompanies, ...padding];
    }

    return sortedCompanies;
  }, [jobs]);

  if (isLoading) {
    return (
      <div className="stat-card flex items-center justify-center h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="stat-card animate-reveal-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-semibold text-foreground">Top Recruiters</h3>
        <button className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium">
          View all
        </button>
      </div>
      <div className="space-y-3">
        {companies.map((c, i) => (
          <div key={c.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-[13px] font-bold text-foreground/60">
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-[14px] font-medium text-foreground">{c.name}</p>
                <p className="text-[12px] text-muted-foreground">{c.offers} roles listed</p>
              </div>
            </div>
            <span
              className="text-[11px] font-semibold px-2 py-1 rounded-lg"
              style={{
                color: c.color,
                background: `${c.color}18`,
              }}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
