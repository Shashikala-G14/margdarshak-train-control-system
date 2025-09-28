import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WeatherAlert {
  id: string;
  region: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRoutes: string[];
  impact: string;
  recommendation: string;
  duration: string;
}

interface RouteImpact {
  route: string;
  weatherCondition: string;
  delayMinutes: number;
  affectedTrains: number;
  speedReduction: number;
  status: 'normal' | 'caution' | 'warning' | 'critical';
}

const WeatherImpact = () => {
  const weatherAlerts: WeatherAlert[] = [
    {
      id: "1",
      region: "Mumbai - Pune Corridor",
      condition: "Heavy Rainfall",
      severity: "high",
      affectedRoutes: ["Mumbai-Pune", "Mumbai-Nashik", "Pune-Solapur"],
      impact: "Speed reduced to 60 km/h, expected delays of 20-30 minutes",
      recommendation: "Monitor track conditions, deploy additional maintenance crews",
      duration: "Next 6 hours"
    },
    {
      id: "2",
      region: "Delhi - Chandigarh",
      condition: "Dense Fog",
      severity: "medium",
      affectedRoutes: ["New Delhi-Chandigarh", "New Delhi-Amritsar"],
      impact: "Visibility reduced, speed restrictions in effect",
      recommendation: "Enhanced signaling protocols, reduced train frequency",
      duration: "Next 4 hours"
    },
    {
      id: "3",
      region: "Chennai - Bangalore",
      condition: "Cyclone Warning",
      severity: "critical",
      affectedRoutes: ["Chennai-Bangalore", "Chennai-Coimbatore", "Chennai-Madurai"],
      impact: "Services suspended on affected routes",
      recommendation: "Immediate service suspension, passenger safety protocols",
      duration: "Next 12 hours"
    }
  ];

  const routeImpacts: RouteImpact[] = [
    {
      route: "Mumbai - Delhi",
      weatherCondition: "Light Rain",
      delayMinutes: 8,
      affectedTrains: 12,
      speedReduction: 10,
      status: "caution"
    },
    {
      route: "Chennai - Kolkata",
      weatherCondition: "Heavy Winds",
      delayMinutes: 25,
      affectedTrains: 8,
      speedReduction: 25,
      status: "warning"
    },
    {
      route: "Delhi - Jammu",
      weatherCondition: "Snow",
      delayMinutes: 45,
      affectedTrains: 6,
      speedReduction: 40,
      status: "critical"
    },
    {
      route: "Bangalore - Hyderabad",
      weatherCondition: "Clear",
      delayMinutes: 0,
      affectedTrains: 0,
      speedReduction: 0,
      status: "normal"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger text-danger-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-danger text-danger-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'caution': return 'bg-warning text-warning-foreground';
      case 'normal': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Weather Impact Analysis</h1>
          <p className="text-muted-foreground">Real-time weather monitoring and impact assessment on railway operations</p>
        </div>

        {/* Weather Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger">3</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">26</div>
              <div className="text-sm text-muted-foreground">Affected Trains</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Routes Impacted</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-railway-primary">18min</div>
              <div className="text-sm text-muted-foreground">Avg. Delay</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Weather Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Active Weather Alerts</h2>
          
          {weatherAlerts.map((alert) => (
            <Alert key={alert.id} className="mb-4">
              <AlertDescription>
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-3 mb-2">
                          {alert.region} - {alert.condition}
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Duration: {alert.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Affected Routes:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {alert.affectedRoutes.map((route, index) => (
                            <Badge key={index} variant="outline">{route}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-medium text-foreground">{alert.impact}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Recommendation:</span>
                          <div className="font-medium text-foreground">{alert.recommendation}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Route Impact Analysis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Route Impact Analysis</h2>
          
          {routeImpacts.map((impact, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 mb-2">
                      {impact.route}
                      <Badge className={getStatusColor(impact.status)}>
                        {impact.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Weather: {impact.weatherCondition}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Average Delay:</span>
                    <div className="font-medium text-foreground">{impact.delayMinutes} minutes</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Affected Trains:</span>
                    <div className="font-medium text-foreground">{impact.affectedTrains}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed Reduction:</span>
                    <div className="font-medium text-foreground">{impact.speedReduction}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Impact Level:</span>
                    <Progress value={impact.speedReduction} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherImpact;