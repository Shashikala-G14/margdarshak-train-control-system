import { RailwaySimulation } from "@/components/railway/RailwaySimulation";

const TrainSimulation = () => {
  return (
    <div className="w-full bg-background" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="w-full h-full p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">Train Movement Simulation</h1>
            <p className="text-muted-foreground">Full-screen railway network simulation with real-time train tracking</p>
          </div>
          
          {/* Full screen simulation */}
          <div className="flex-1 min-h-0">
            <div className="w-full h-full bg-map-background border border-border rounded-lg relative overflow-hidden shadow-card">
              <RailwaySimulation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainSimulation;