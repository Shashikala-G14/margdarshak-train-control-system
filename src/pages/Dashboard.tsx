import { RailwaySimulation } from "@/components/railway/RailwaySimulation";
import { SystemMetrics } from "@/components/dashboard/SystemMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Fixed Railway Simulation at top */}
      <div className="w-full p-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">Railway Network Overview</h1>
            <p className="text-muted-foreground">Real-time train movement and system status across Indian Railways</p>
          </div>
          <RailwaySimulation />
        </div>
      </div>

      {/* Scrollable content below simulation */}
      <div className="w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">System Status & Metrics</h2>
            <p className="text-sm text-muted-foreground">Current operational status and key performance indicators</p>
          </div>
          
          <SystemMetrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;