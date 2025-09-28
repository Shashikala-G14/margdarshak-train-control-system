import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Train {
  id: string;
  name: string;
  number: string;
  x: number;
  y: number;
  status: 'moving' | 'delayed' | 'stopped' | 'ontime';
  route: string;
  arrival: string;
  departure: string;
  speed: number;
}

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
}

export const RailwaySimulation = () => {
  const [zoom, setZoom] = useState(1);
  const [trains, setTrains] = useState<Train[]>([
    {
      id: "1",
      name: "Shatabdi Express",
      number: "12001",
      x: 150,
      y: 120,
      status: "moving",
      route: "New Delhi - Bhopal",
      arrival: "14:30",
      departure: "14:35",
      speed: 2
    },
    {
      id: "2",
      name: "Vande Bharat",
      number: "20001",
      x: 300,
      y: 200,
      status: "ontime",
      route: "Mumbai - Ahmedabad",
      arrival: "09:15",
      departure: "09:20",
      speed: 1.5
    },
    {
      id: "3",
      name: "Saurashtra Express",
      number: "19002",
      x: 450,
      y: 180,
      status: "delayed",
      route: "Mumbai - Jammu Tawi",
      arrival: "16:45",
      departure: "17:10",
      speed: 1
    },
    {
      id: "4",
      name: "Rajdhani Express",
      number: "12951",
      x: 200,
      y: 300,
      status: "moving",
      route: "New Delhi - Mumbai",
      arrival: "11:20",
      departure: "11:25",
      speed: 2.2
    }
  ]);

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const stations: Station[] = [
    { id: "1", name: "New Delhi", x: 140, y: 110 },
    { id: "2", name: "Mumbai Central", x: 290, y: 290 },
    { id: "3", name: "Ahmedabad", x: 320, y: 190 },
    { id: "4", name: "Bhopal", x: 250, y: 200 },
    { id: "5", name: "Jammu Tawi", x: 100, y: 80 },
    { id: "6", name: "Chennai Central", x: 350, y: 380 },
    { id: "7", name: "Kolkata", x: 480, y: 200 },
    { id: "8", name: "Bangalore", x: 340, y: 350 }
  ];

  // Animate trains
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          x: train.x + (Math.random() - 0.5) * train.speed,
          y: train.y + (Math.random() - 0.5) * train.speed,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTrainColor = (status: Train['status']) => {
    switch (status) {
      case 'moving': return 'bg-train-moving';
      case 'delayed': return 'bg-train-delayed';
      case 'stopped': return 'bg-train-stopped';
      case 'ontime': return 'bg-train-ontime';
      default: return 'bg-muted';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="w-full h-80 bg-map-background border border-border rounded-lg relative overflow-hidden shadow-card">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button onClick={handleZoomIn} size="sm" variant="outline" className="bg-background">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={handleZoomOut} size="sm" variant="outline" className="bg-background">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button onClick={handleReset} size="sm" variant="outline" className="bg-background">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm rounded-md p-3 border border-border">
        <h3 className="text-sm font-semibold mb-2 text-foreground">Train Status</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-train-moving rounded-full"></div>
            <span className="text-xs text-muted-foreground">Moving</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-train-delayed rounded-full"></div>
            <span className="text-xs text-muted-foreground">Delayed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-train-stopped rounded-full"></div>
            <span className="text-xs text-muted-foreground">Stopped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-train-ontime rounded-full"></div>
            <span className="text-xs text-muted-foreground">On Time</span>
          </div>
        </div>
      </div>

      {/* Railway Map */}
      <div 
        className="w-full h-full relative bg-gradient-to-br from-slate-50 to-slate-100"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
      >
        {/* Railway tracks - simplified lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Main railway lines */}
          <line x1="140" y1="110" x2="290" y2="290" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="290" y1="190" x2="480" y2="200" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="140" y1="110" x2="100" y2="80" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="290" y1="290" x2="350" y2="380" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="350" y1="380" x2="340" y2="350" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="250" y1="200" x2="290" y2="290" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Stations */}
        {stations.map(station => (
          <div
            key={station.id}
            className="absolute w-4 h-4 bg-station-marker rounded-full border-2 border-white shadow-sm transform -translate-x-2 -translate-y-2 z-20"
            style={{ left: station.x, top: station.y }}
            title={station.name}
          >
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background px-1 py-0.5 rounded text-xs font-medium text-foreground whitespace-nowrap border border-border shadow-sm">
              {station.name}
            </div>
          </div>
        ))}

        {/* Trains */}
        {trains.map(train => (
          <div
            key={train.id}
            className={`absolute w-6 h-6 ${getTrainColor(train.status)} rounded-sm shadow-elevated border-2 border-white transform -translate-x-3 -translate-y-3 cursor-pointer hover:scale-110 transition-transform z-30`}
            style={{ left: train.x, top: train.y }}
            onClick={() => setSelectedTrain(train)}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-3 bg-white rounded-sm"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Train Details Modal */}
      {selectedTrain && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50" onClick={() => setSelectedTrain(null)}>
          <Card className="bg-background p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-4">{selectedTrain.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Train Number:</span>
                <span className="font-medium text-foreground">{selectedTrain.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route:</span>
                <span className="font-medium text-foreground">{selectedTrain.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Arrival:</span>
                <span className="font-medium text-foreground">{selectedTrain.arrival}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departure:</span>
                <span className="font-medium text-foreground">{selectedTrain.departure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTrain.status === 'moving' ? 'bg-train-moving text-white' :
                  selectedTrain.status === 'delayed' ? 'bg-train-delayed text-white' :
                  selectedTrain.status === 'stopped' ? 'bg-train-stopped text-white' :
                  'bg-train-ontime text-white'
                }`}>
                  {selectedTrain.status.charAt(0).toUpperCase() + selectedTrain.status.slice(1)}
                </span>
              </div>
            </div>
            <Button 
              onClick={() => setSelectedTrain(null)} 
              className="w-full mt-4"
              variant="outline"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};