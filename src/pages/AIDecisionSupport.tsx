import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  impact: string;
  action: string;
  timeEstimate: string;
}

const AIDecisionSupport = () => {
  const recommendations: AIRecommendation[] = [
    {
      id: "1",
      title: "Route Optimization - Shatabdi Express",
      description: "Current route experiencing 15-minute delay due to track congestion. Alternative route available with 8-minute time saving.",
      priority: "high",
      confidence: 92,
      impact: "Reduce delay by 8 minutes",
      action: "Reroute via alternate track 2B",
      timeEstimate: "2 minutes"
    },
    {
      id: "2",
      title: "Platform Allocation - Mumbai Central",
      description: "Platform 4 will be congested in next 20 minutes. Platform 6 recommended for incoming Rajdhani Express.",
      priority: "medium",
      confidence: 85,
      impact: "Prevent platform congestion",
      action: "Reassign to Platform 6",
      timeEstimate: "1 minute"
    },
    {
      id: "3",
      title: "Weather Delay Prevention",
      description: "Heavy rainfall predicted on Delhi-Chandigarh route. Suggest speed reduction for safety.",
      priority: "high",
      confidence: 88,
      impact: "Prevent weather-related delays",
      action: "Reduce speed to 80 km/h",
      timeEstimate: "Immediate"
    },
    {
      id: "4",
      title: "Crossing Priority Optimization",
      description: "Train precedence conflict at junction JN-247. Vande Bharat has higher priority based on passenger load.",
      priority: "medium",
      confidence: 94,
      impact: "Optimize passenger experience",
      action: "Grant precedence to Vande Bharat",
      timeEstimate: "30 seconds"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">AI Decision Support System</h1>
          <p className="text-muted-foreground">Intelligent recommendations for optimal train operations and conflict resolution</p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Active Recommendations</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Decisions Today</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-railway-primary">12min</div>
              <div className="text-sm text-muted-foreground">Avg. Time Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Current Recommendations</h2>
          
          {recommendations.map((rec) => (
            <Card key={rec.id} className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 mb-2">
                      {rec.title}
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence Level</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={rec.confidence} className="w-24 h-2" />
                      <span className="text-sm font-medium text-foreground">{rec.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <div className="font-medium text-foreground">{rec.impact}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recommended Action:</span>
                      <div className="font-medium text-foreground">{rec.action}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Implementation Time:</span>
                      <div className="font-medium text-foreground">{rec.timeEstimate}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button className="bg-railway-primary hover:bg-railway-primary/90">
                      Accept Recommendation
                    </Button>
                    <Button variant="outline">
                      Review Details
                    </Button>
                    <Button variant="outline" className="text-muted-foreground">
                      Dismiss
                    </Button>
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

export default AIDecisionSupport;