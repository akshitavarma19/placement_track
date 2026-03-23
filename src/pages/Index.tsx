import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCards from "@/components/StatCards";
import PlacementChart from "@/components/PlacementChart";
import TopCompanies from "@/components/TopCompanies";
import SkillDemand from "@/components/SkillDemand";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1280px]">
        <DashboardHeader />
        <StatCards />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="lg:col-span-2">
            <PlacementChart />
          </div>
          <TopCompanies />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <SkillDemand />
          <AIInsights />
        </div>
      </main>
    </div>
  );
};

export default Index;
