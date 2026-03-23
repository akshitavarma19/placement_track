import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, HelpCircle } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    icon: User,
    title: "Profile",
    desc: "Update your name, email, and role",
    fields: [
      { label: "Full Name", value: "Admin User", type: "text" },
      { label: "Email Address", value: "admin@college.edu", type: "email" },
      { label: "Role", value: "Placement Coordinator", type: "text" },
      { label: "Department", value: "Training & Placement Cell", type: "text" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Configure alerts and reminders",
    toggles: [
      { label: "New company registration", defaultOn: true },
      { label: "Student placement updates", defaultOn: true },
      { label: "Weekly placement summary", defaultOn: true },
      { label: "AI insights digest", defaultOn: false },
      { label: "System maintenance alerts", defaultOn: false },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Password and access settings",
    fields: [
      { label: "Current Password", value: "", type: "password" },
      { label: "New Password", value: "", type: "password" },
      { label: "Confirm Password", value: "", type: "password" },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(
      sections
        .filter((s) => s.toggles)
        .flatMap((s) => s.toggles!.map((t) => [t.label, t.defaultOn]))
    )
  );

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[900px]">
        <DashboardHeader />

        <div className="flex items-center gap-3 mt-2 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "hsl(var(--accent) / 0.12)" }}>
            <SettingsIcon className="w-5 h-5" style={{ color: "hsl(var(--accent))" }} />
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-foreground">Settings</h2>
            <p className="text-[13px] text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="stat-card animate-reveal-up">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary">
                    <Icon className="w-4 h-4 text-foreground/70" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-foreground">{section.title}</h3>
                    <p className="text-[12px] text-muted-foreground">{section.desc}</p>
                  </div>
                </div>

                {section.fields && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.label}>
                        <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          placeholder={field.type === "password" ? "••••••••" : field.value}
                          className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-foreground bg-secondary border border-border/50 focus:outline-none focus:border-accent transition-colors"
                          style={{ borderColor: "hsl(var(--border))" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.toggles && (
                  <div className="space-y-4">
                    {section.toggles.map((toggle) => (
                      <div key={toggle.label} className="flex items-center justify-between">
                        <span className="text-[13px] text-foreground">{toggle.label}</span>
                        <button
                          onClick={() => setToggles((prev) => ({ ...prev, [toggle.label]: !prev[toggle.label] }))}
                          className="relative w-11 h-6 rounded-full transition-colors duration-200"
                          style={{ background: toggles[toggle.label] ? "hsl(var(--accent))" : "hsl(var(--secondary))" }}
                        >
                          <span
                            className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                            style={{ transform: toggles[toggle.label] ? "translateX(20px)" : "translateX(0)" }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="mt-5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "hsl(var(--accent))" }}
                >
                  Save {section.title}
                </button>
              </div>
            );
          })}

          {/* Danger zone */}
          <div className="stat-card border animate-reveal-up" style={{ borderColor: "hsl(var(--danger) / 0.3)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--danger) / 0.1)" }}>
                <HelpCircle className="w-4 h-4" style={{ color: "hsl(var(--danger))" }} />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold" style={{ color: "hsl(var(--danger))" }}>Danger Zone</h3>
                <p className="text-[12px] text-muted-foreground">Irreversible actions</p>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground mb-4">
              Resetting the dashboard will clear all cached data and restore the system to defaults. This cannot be undone.
            </p>
            <button
              className="px-4 py-2 rounded-xl text-[13px] font-semibold border transition-colors hover:bg-red-50"
              style={{ color: "hsl(var(--danger))", borderColor: "hsl(var(--danger) / 0.4)" }}
            >
              Reset Dashboard Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
