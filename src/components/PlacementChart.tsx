import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2019", placed: 780, total: 1020 },
  { year: "2020", placed: 650, total: 980 },
  { year: "2021", placed: 820, total: 1050 },
  { year: "2022", placed: 950, total: 1100 },
  { year: "2023", placed: 1120, total: 1200 },
  { year: "2024", placed: 1247, total: 1430 },
];

export default function PlacementChart() {
  return (
    <div className="stat-card animate-reveal-up" style={{ animationDelay: "320ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">Placement Trends</h3>
          <p className="text-[13px] text-muted-foreground mt-0.5">Year-wise placement overview</p>
        </div>
        <select className="text-[13px] bg-secondary text-foreground rounded-lg px-3 py-1.5 border-0 outline-none font-medium">
          <option>All Years</option>
          <option>Last 3 Years</option>
        </select>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 90%)" vertical={false} />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(20 6% 44%)" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(20 6% 44%)" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(0 0% 100%)",
                border: "1px solid hsl(30 10% 90%)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="total" fill="hsl(30 8% 88%)" radius={[6, 6, 0, 0]} name="Total Students" />
            <Bar dataKey="placed" fill="hsl(126 40% 46%)" radius={[6, 6, 0, 0]} name="Placed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
