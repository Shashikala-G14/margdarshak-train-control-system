import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Train, Map, Activity, Brain, CloudSnow, MessageSquare } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Train,
      title: "Live Train Tracking",
      description: "Real-time simulation of trains across Indian railway network"
    },
    {
      icon: Brain,
      title: "AI Decision Support",
      description: "Intelligent recommendations for optimal train scheduling"
    },
    {
      icon: Activity,
      title: "Live Status Monitoring",
      description: "Track delays, conflicts, and system performance"
    },
    {
      icon: CloudSnow,
      title: "Weather Impact Analysis",
      description: "Monitor weather effects on railway operations"
    },
    {
      icon: MessageSquare,
      title: "Margdarshak Assistant",
      description: "AI chatbot for queries and predictions"
    },
    {
      icon: Map,
      title: "Track Simulation",
      description: "Interactive railway map with full-screen view"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-secondary rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-accent rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Margdarshak</h1>
                <p className="text-sm text-muted-foreground">Railway Control System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Intelligent Railway
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Control System</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Advanced AI-powered decision support system for optimal train scheduling, real-time tracking, and conflict resolution across the Indian railway network.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-400">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/dashboard')}
              >
                <Train className="mr-2 h-5 w-5" />
                Launch Control Center
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold border-2 hover:bg-accent/50 transition-all duration-300"
                onClick={() => navigate('/simulation')}
              >
                <Map className="mr-2 h-5 w-5" />
                View Live Simulation
              </Button>
            </div>

            {/* Indian Railway Map Visualization */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-background to-muted/20 border-2 border-border/50 shadow-2xl animate-fade-in delay-600">
                <div className="relative h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden border-2 border-border">
                  {/* Simplified Indian Map Outline */}
                  <svg viewBox="0 0 600 400" className="w-full h-full">
                    {/* India outline - simplified */}
                    <path
                      d="M150 80 Q200 60 250 80 Q300 70 350 90 Q400 100 450 120 Q500 140 520 180 Q530 220 520 260 Q510 300 480 330 Q450 350 400 360 Q350 370 300 360 Q250 350 200 340 Q150 330 120 300 Q100 260 110 220 Q120 180 130 140 Q140 100 150 80 Z"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                    
                    {/* Major Railway Lines */}
                    <line x1="180" y1="120" x2="420" y2="180" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.8" />
                    <line x1="200" y1="200" x2="450" y2="160" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.8" />
                    <line x1="180" y1="160" x2="180" y2="300" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.8" />
                    <line x1="420" y1="180" x2="380" y2="320" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.8" />
                    
                    {/* Major Cities/Stations */}
                    <circle cx="280" cy="130" r="4" fill="hsl(var(--primary))" className="animate-pulse" />
                    <circle cx="180" cy="200" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-300" />
                    <circle cx="380" cy="320" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-600" />
                    <circle cx="420" cy="180" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-900" />
                    
                    {/* Animated Train Icons */}
                    <g className="animate-pulse">
                      <rect x="260" y="125" width="12" height="8" rx="2" fill="hsl(var(--success))" />
                      <circle cx="266" cy="129" r="1" fill="white" />
                    </g>
                    <g className="animate-pulse delay-500">
                      <rect x="160" y="195" width="12" height="8" rx="2" fill="hsl(var(--warning))" />
                      <circle cx="166" cy="199" r="1" fill="white" />
                    </g>
                    <g className="animate-pulse delay-1000">
                      <rect x="400" y="175" width="12" height="8" rx="2" fill="hsl(var(--info))" />
                      <circle cx="406" cy="179" r="1" fill="white" />
                    </g>
                    
                    {/* City Labels */}
                    <text x="290" y="145" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">Delhi</text>
                    <text x="170" y="220" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">Mumbai</text>
                    <text x="430" y="200" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">Kolkata</text>
                    <text x="380" y="340" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">Chennai</text>
                  </svg>
                  
                  {/* Live Status Overlay */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">Live Tracking Active</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      156 trains • 3 conflicts • 87% availability
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Railway Network</h3>
                  <p className="text-muted-foreground">
                    Monitor live train movements, track conflicts, and optimize schedules across India's extensive railway infrastructure
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Comprehensive Control Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced tools and AI-powered insights for efficient railway operations management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-gradient-to-br from-background to-muted/10 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6 py-16 text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Optimize Railway Operations?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven railway management with real-time insights, predictive analytics, and intelligent decision support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/dashboard')}
              >
                <Activity className="mr-2 h-5 w-5" />
                Start Managing
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold"
                onClick={() => navigate('/assistant')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Try Margdarshak AI
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Landing;