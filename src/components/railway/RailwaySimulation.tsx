import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";

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
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [trains, setTrains] = useState<Train[]>([
    // North India
    {
      id: "1",
      name: "Shatabdi Express",
      number: "12001",
      x: 280, // New Delhi area
      y: 150,
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
      x: 200, // Gujarat area
      y: 250,
      status: "ontime",
      route: "Mumbai - Ahmedabad",
      arrival: "09:15",
      departure: "09:20",
      speed: 1.5
    },
    // West India
    {
      id: "3",
      name: "Saurashtra Express",
      number: "19002",
      x: 180, // Mumbai area
      y: 320,
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
      x: 240, // Central India
      y: 280,
      status: "moving",
      route: "New Delhi - Mumbai",
      arrival: "11:20",
      departure: "11:25",
      speed: 2.2
    },
    // South India
    {
      id: "5",
      name: "Chennai Express",
      number: "12163",
      x: 350, // Chennai area
      y: 450,
      status: "ontime",
      route: "Chennai - Bangalore",
      arrival: "08:30",
      departure: "08:35",
      speed: 1.8
    },
    {
      id: "6",
      name: "Kerala Express",
      number: "12626",
      x: 310, // Kerala area
      y: 480,
      status: "moving",
      route: "Trivandrum - Delhi",
      arrival: "19:45",
      departure: "19:50",
      speed: 1.3
    },
    // East India
    {
      id: "7",
      name: "Howrah Express",
      number: "12322",
      x: 420, // Kolkata area
      y: 240,
      status: "stopped",
      route: "Howrah - Mumbai",
      arrival: "15:30",
      departure: "15:40",
      speed: 1.6
    },
    // Northeast
    {
      id: "8",
      name: "Assam Express",
      number: "15646",
      x: 480, // Assam area
      y: 180,
      status: "delayed",
      route: "Guwahati - Delhi",
      arrival: "12:15",
      departure: "12:25",
      speed: 1.4
    }
  ]);

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  // Comprehensive Indian railway stations with realistic positions
  const stations: Station[] = [
    // North India
    { id: "1", name: "New Delhi", x: 280, y: 150 },
    { id: "2", name: "Chandigarh", x: 270, y: 120 },
    { id: "3", name: "Amritsar", x: 250, y: 100 },
    { id: "4", name: "Jammu Tawi", x: 260, y: 80 },
    
    // West India
    { id: "5", name: "Mumbai Central", x: 180, y: 320 },
    { id: "6", name: "Ahmedabad", x: 200, y: 250 },
    { id: "7", name: "Pune", x: 190, y: 340 },
    { id: "8", name: "Surat", x: 185, y: 280 },
    
    // Central India
    { id: "9", name: "Bhopal", x: 240, y: 200 },
    { id: "10", name: "Indore", x: 220, y: 220 },
    { id: "11", name: "Nagpur", x: 280, y: 260 },
    { id: "12", name: "Raipur", x: 320, y: 260 },
    
    // South India
    { id: "13", name: "Chennai Central", x: 350, y: 450 },
    { id: "14", name: "Bangalore", x: 330, y: 420 },
    { id: "15", name: "Hyderabad", x: 320, y: 380 },
    { id: "16", name: "Kochi", x: 310, y: 480 },
    { id: "17", name: "Trivandrum", x: 315, y: 500 },
    { id: "18", name: "Coimbatore", x: 320, y: 460 },
    
    // East India
    { id: "19", name: "Howrah", x: 420, y: 240 },
    { id: "20", name: "Sealdah", x: 425, y: 235 },
    { id: "21", name: "Bhubaneswar", x: 390, y: 300 },
    { id: "22", name: "Cuttack", x: 395, y: 295 },
    
    // Northeast
    { id: "23", name: "Guwahati", x: 480, y: 180 },
    { id: "24", name: "Dibrugarh", x: 520, y: 170 },
    { id: "25", name: "Agartala", x: 460, y: 210 }
  ];

  // Animate trains moving along realistic routes
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          x: train.x + (Math.random() - 0.5) * train.speed,
          y: train.y + (Math.random() - 0.5) * train.speed,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mouse handlers for pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.3, Math.min(4, prev + delta)));
  };

  const getTrainColor = (status: Train['status']) => {
    switch (status) {
      case 'moving': return 'bg-train-moving';
      case 'delayed': return 'bg-train-delayed';
      case 'stopped': return 'bg-train-stopped';
      case 'ontime': return 'bg-train-ontime';
      default: return 'bg-muted';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full h-80 bg-slate-900 border border-border rounded-lg relative overflow-hidden shadow-card">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Button onClick={handleZoomIn} size="sm" variant="outline" className="bg-background hover:bg-accent">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button onClick={handleZoomOut} size="sm" variant="outline" className="bg-background hover:bg-accent">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button onClick={handleReset} size="sm" variant="outline" className="bg-background hover:bg-accent">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-background/95 backdrop-blur-sm rounded-md p-2 border border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Move className="h-3 w-3" />
            <span>Drag to pan • Scroll to zoom</span>
          </div>
        </div>
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

      {/* Railway Map of India */}
      <div 
        ref={mapRef}
        className={`w-full h-full relative bg-gradient-to-br from-slate-800 to-slate-900 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: "center center"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* India outline - simplified representation */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          
          {/* Major railway corridors */}
          {/* Golden Quadrilateral */}
          <line x1="280" y1="150" x2="180" y2="320" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
          <line x1="180" y1="320" x2="330" y2="420" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
          <line x1="330" y1="420" x2="420" y2="240" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
          <line x1="420" y1="240" x2="280" y2="150" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
          
          {/* North-South corridors */}
          <line x1="280" y1="150" x2="240" y2="200" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="240" y1="200" x2="180" y2="320" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="180" y1="320" x2="315" y2="500" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* East-West corridors */}
          <line x1="200" y1="250" x2="420" y2="240" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="420" y1="240" x2="480" y2="180" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Additional major routes */}
          <line x1="330" y1="420" x2="350" y2="450" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="280" y1="150" x2="270" y2="120" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="270" y1="120" x2="250" y2="100" stroke="hsl(var(--track-primary))" strokeWidth="2" strokeDasharray="5,5" />
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