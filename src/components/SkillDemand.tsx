const skills = [
  { name: "Python", demand: 92 },
  { name: "React.js", demand: 85 },
  { name: "Java", demand: 78 },
  { name: "SQL", demand: 74 },
  { name: "Machine Learning", demand: 68 },
  { name: "Cloud (AWS/Azure)", demand: 63 },
  { name: "Data Analysis", demand: 58 },
];

export default function SkillDemand() {
  return (
    <div className="stat-card animate-reveal-up" style={{ animationDelay: "480ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">Skill Demand</h3>
          <p className="text-[13px] text-muted-foreground mt-0.5">Based on latest job postings</p>
        </div>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-medium text-foreground">{skill.name}</span>
              <span className="text-[12px] font-semibold text-muted-foreground tabular-nums">{skill.demand}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${skill.demand}%`,
                  background: skill.demand > 80
                    ? "hsl(var(--success))"
                    : skill.demand > 65
                    ? "hsl(var(--chart-2))"
                    : "hsl(var(--chart-4))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
