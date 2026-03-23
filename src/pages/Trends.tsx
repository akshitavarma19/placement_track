import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const placementTrend = [
  { year: "2019", rate: 71, avg: 5.2 },
  { year: "2020", rate: 65, avg: 4.8 },
  { year: "2021", rate: 74, avg: 6.1 },
  { year: "2022", rate: 79, avg: 7.0 },
  { year: "2023", rate: 83, avg: 7.9 },
  { year: "2024", rate: 87, avg: 8.4 },
];

const sectorTrend = [
  { sector: "IT Services", y2022: 48, y2023: 51, y2024: 55 },
  { sector: "Product", y2022: 12, y2023: 16, y2024: 22 },
  { sector: "Consulting", y2022: 18, y2023: 17, y2024: 15 },
  { sector: "Core Engg", y2022: 14, y2023: 10, y2024: 6 },
  { sector: "Others", y2022: 8, y2023: 6, y2024: 2 },
];

const kpis = [
  { label: "Placement Rate (YoY)", value: "+4.2%", positive: true, desc: "83% → 87.3%" },
  { label: "Avg Package (YoY)", value: "+18.5%", positive: true, desc: "₹7.9L → ₹8.4L" },
  { label: "Core Engg Placements", value: "-40%", positive: false, desc: "Shifting to IT/Product" },
  { label: "Product Companies", value: "+37.5%", positive: true, desc: "16 → 22 offers" },
];

export default function Trends() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {kpis.map((k, i) => (
            <div key={k.label} className="stat-card animate-reveal-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-[13px] font-medium">{k.label}</span>
                {k.positive
                  ? <ArrowUpRight className="w-5 h-5" style={{ color: "hsl(var(--success))" }} />
                  : <ArrowDownRight className="w-5 h-5" style={{ color: "hsl(var(--danger))" }} />}
              </div>
              <div className="text-[26px] font-bold tracking-tight"
                style={{ color: k.positive ? "hsl(var(--success))" : "hsl(var(--danger))" }}>
                {k.value}
              </div>
              <p className="mt-2 text-[12px] text-muted-foreground">{k.desc}</p>
            </div>
          ))}
        </div>

        {/* Area chart */}
        <div className="stat-card mt-6 animate-reveal-up" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(var(--accent) / 0.12)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "hsl(var(--accent))" }} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-foreground">5-Year Placement Trend</h3>
              <p className="text-[12px] text-muted-foreground">Rate (%) and Avg Package (₹L)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={placementTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pkgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 13 }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Area type="monotone" dataKey="rate" name="Placement Rate (%)" stroke="hsl(var(--accent))" fill="url(#rateGrad)" strokeWidth={2} dot={{ r: 4 }} />
              <Area type="monotone" dataKey="avg" name="Avg Package (₹L)" stroke="hsl(var(--success))" fill="url(#pkgGrad)" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="stat-card mt-6 animate-reveal-up" style={{ animationDelay: "440ms" }}>
          <h3 className="text-[15px] font-semibold text-foreground mb-1">Sector-wise Placement Share (%)</h3>
          <p className="text-[12px] text-muted-foreground mb-5">Year-over-year comparison</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sectorTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="sector" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Bar dataKey="y2022" name="2022" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="y2023" name="2023" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="y2024" name="2024" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
