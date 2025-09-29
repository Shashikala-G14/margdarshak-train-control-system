import { RailwaySimulation } from "@/components/railway/RailwaySimulation";

const TrainSimulation = () => {
  return (
    <div className="w-full bg-background" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="w-full h-full">
        <RailwaySimulation />
      </div>
    </div>
  );
};

export default TrainSimulation;