import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface TrainStatus {
  trainNumber: string;
  trainName: string;
  route: string;
  currentStation: string;
  nextStation: string;
  status: 'ontime' | 'delayed' | 'cancelled' | 'departed';
  delay: number;
  arrivalTime: string;
  departureTime: string;
  platform: string;
  passengers: number;
  coaches: number;
}

const LiveTrainStatus = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const trainStatuses: TrainStatus[] = [
    {
      trainNumber: "12001",
      trainName: "Shatabdi Express",
      route: "New Delhi - Bhopal",
      currentStation: "Gwalior Junction",
      nextStation: "Bhopal Junction",
      status: "ontime",
      delay: 0,
      arrivalTime: "14:30",
      departureTime: "14:35",
      platform: "2",
      passengers: 847,
      coaches: 18
    },
    {
      trainNumber: "20001",
      trainName: "Vande Bharat Express",
      route: "Mumbai - Ahmedabad",
      currentStation: "Vadodara Junction",
      nextStation: "Ahmedabad Junction",
      status: "delayed",
      delay: 15,
      arrivalTime: "09:30",
      departureTime: "09:35",
      platform: "4",
      passengers: 1124,
      coaches: 16
    },
    {
      trainNumber: "19002",
      trainName: "Saurashtra Express",
      route: "Mumbai - Jammu Tawi",
      currentStation: "Ajmer Junction",
      nextStation: "Jaipur Junction",
      status: "delayed",
      delay: 25,
      arrivalTime: "17:10",
      departureTime: "17:15",
      platform: "1",
      passengers: 1456,
      coaches: 22
    },
    {
      trainNumber: "12951",
      trainName: "Rajdhani Express",
      route: "New Delhi - Mumbai",
      currentStation: "Kota Junction",
      nextStation: "Ratlam Junction",
      status: "ontime",
      delay: 0,
      arrivalTime: "11:20",
      departureTime: "11:25",
      platform: "3",
      passengers: 892,
      coaches: 20
    },
    {
      trainNumber: "12423",
      trainName: "Dibrugarh Rajdhani",
      route: "New Delhi - Dibrugarh",
      currentStation: "Guwahati",
      nextStation: "Dibrugarh",
      status: "departed",
      delay: 0,
      arrivalTime: "22:15",
      departureTime: "22:20",
      platform: "5",
      passengers: 654,
      coaches: 16
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ontime': return 'bg-train-ontime text-white';
      case 'delayed': return 'bg-train-delayed text-white';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'departed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredTrains = trainStatuses.filter(train =>
    train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Live Train Status</h1>
          <p className="text-muted-foreground">Real-time tracking and status updates for all active trains</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by train number, name, or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Total Trains</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-train-ontime">124</div>
              <div className="text-sm text-muted-foreground">On Time</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-train-delayed">28</div>
              <div className="text-sm text-muted-foreground">Delayed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">4</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-railway-primary">94.2%</div>
              <div className="text-sm text-muted-foreground">Punctuality</div>
            </CardContent>
          </Card>
        </div>

        {/* Train Status List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Current Train Status</h2>
          
          {filteredTrains.map((train) => (
            <Card key={train.trainNumber} className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 mb-2">
                      <span>{train.trainNumber} - {train.trainName}</span>
                      <Badge className={getStatusColor(train.status)}>
                        {train.status === 'ontime' ? 'On Time' : 
                         train.status === 'delayed' ? `Delayed ${train.delay}min` : 
                         train.status.charAt(0).toUpperCase() + train.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{train.route}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Current Station:</span>
                    <div className="font-medium text-foreground">{train.currentStation}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Station:</span>
                    <div className="font-medium text-foreground">{train.nextStation}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platform:</span>
                    <div className="font-medium text-foreground">{train.platform}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Arrival/Departure:</span>
                    <div className="font-medium text-foreground">{train.arrivalTime} / {train.departureTime}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Passengers:</span>
                    <div className="font-medium text-foreground">{train.passengers.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Coaches:</span>
                    <div className="font-medium text-foreground">{train.coaches}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Track Journey
                  </Button>
                  <Button variant="outline" size="sm">
                    Passenger Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTrainStatus;