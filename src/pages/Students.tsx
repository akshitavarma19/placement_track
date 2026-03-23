import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";

const students = [
  { name: "Aarav Sharma", branch: "CSE", cgpa: 9.1, status: "Placed", company: "Google", package: "₹28L", year: 2024 },
  { name: "Priya Mehta", branch: "ECE", cgpa: 8.7, status: "Placed", company: "Microsoft", package: "₹22L", year: 2024 },
  { name: "Rohan Verma", branch: "CSE", cgpa: 8.4, status: "Placed", company: "TCS", package: "₹7.5L", year: 2024 },
  { name: "Sneha Patel", branch: "IT", cgpa: 8.9, status: "Placed", company: "Infosys", package: "₹6.5L", year: 2024 },
  { name: "Karan Singh", branch: "ME", cgpa: 7.8, status: "Un-placed", company: "—", package: "—", year: 2024 },
  { name: "Anjali Joshi", branch: "CSE", cgpa: 9.3, status: "Placed", company: "Amazon", package: "₹32L", year: 2024 },
  { name: "Dev Nair", branch: "CSE", cgpa: 8.0, status: "Placed", company: "Wipro", package: "₹5.5L", year: 2024 },
  { name: "Meera Iyer", branch: "IT", cgpa: 7.5, status: "Un-placed", company: "—", package: "—", year: 2024 },
  { name: "Arjun Reddy", branch: "ECE", cgpa: 8.2, status: "Placed", company: "Cognizant", package: "₹5L", year: 2024 },
  { name: "Pooja Gupta", branch: "CSE", cgpa: 9.0, status: "Placed", company: "Adobe", package: "₹18L", year: 2024 },
];

const statusColor: Record<string, { color: string; bg: string }> = {
  Placed: { color: "#3EA945", bg: "#3EA94520" },
  "Un-placed": { color: "#E05555", bg: "#E0555520" },
};

export default function Students() {
  const placed = students.filter((s) => s.status === "Placed").length;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[
            { label: "Total Students", value: students.length, icon: Users, change: "2024 batch" },
            { label: "Placed", value: placed, icon: Award, change: `${Math.round((placed / students.length) * 100)}% rate` },
            { label: "Un-placed", value: students.length - placed, icon: GraduationCap, change: "seeking offers" },
            { label: "Avg CGPA", value: (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(1), icon: TrendingUp, change: "out of 10.0" },
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

        {/* Table */}
        <div className="stat-card mt-6 animate-reveal-up" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-semibold text-foreground">Student Records</h3>
            <span className="text-[13px] text-muted-foreground">{students.length} students</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Branch", "CGPA", "Status", "Company", "Package"].map((h) => (
                    <th key={h} className="text-left pb-3 pr-4 text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 pr-4 font-medium text-foreground">{s.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{s.branch}</td>
                    <td className="py-3 pr-4 font-semibold text-foreground">{s.cgpa}</td>
                    <td className="py-3 pr-4">
                      <span className="text-[11px] font-semibold px-2 py-1 rounded-lg"
                        style={{ color: statusColor[s.status].color, background: statusColor[s.status].bg }}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-foreground">{s.company}</td>
                    <td className="py-3 font-semibold" style={{ color: s.package !== "—" ? "hsl(var(--success))" : "hsl(var(--muted-foreground))" }}>{s.package}</td>
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
