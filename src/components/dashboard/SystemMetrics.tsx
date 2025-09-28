import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  progress?: number;
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard = ({ title, value, subtitle, status = 'neutral', progress, trend }: MetricCardProps) => {
  const getStatusColors = () => {
    switch (status) {
      case 'success': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'danger': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && (
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">{subtitle}</p>
                {trend && (
                  <span className="text-xs text-muted-foreground">{getTrendIcon()}</span>
                )}
              </div>
            )}
          </div>
          <Badge className={getStatusColors()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% capacity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const SystemMetrics = () => {
  return (
    <div className="w-full space-y-6">
      {/* Track Conflicts */}
      <div className="w-full">
        <MetricCard
          title="Track Conflicts Detected"
          value={3}
          subtitle="Active conflicts requiring attention"
          status="danger"
          trend="up"
        />
      </div>

      {/* Train Status Overview */}
      <div className="w-full">
        <MetricCard
          title="Delayed Trains"
          value={12}
          subtitle="Currently running behind schedule"
          status="warning"
          trend="down"
        />
      </div>

      <div className="w-full">
        <MetricCard
          title="Moving Trains"
          value={156}
          subtitle="Active trains on network"
          status="success"
          trend="stable"
        />
      </div>

      <div className="w-full">
        <MetricCard
          title="Stopped Trains"
          value={8}
          subtitle="Trains currently at stations"
          status="neutral"
          trend="stable"
        />
      </div>

      {/* Weather Impact */}
      <div className="w-full">
        <MetricCard
          title="Weather Affected Routes"
          value={5}
          subtitle="Routes impacted by weather conditions"
          status="warning"
          trend="up"
        />
      </div>

      {/* Construction Work */}
      <div className="w-full">
        <MetricCard
          title="Construction Activities"
          value={2}
          subtitle="Active construction zones"
          status="warning"
          trend="stable"
        />
      </div>

      {/* Track Availability */}
      <div className="w-full">
        <MetricCard
          title="Track Availability"
          value="87%"
          subtitle="Available tracks across network"
          status="success"
          progress={87}
          trend="stable"
        />
      </div>

      <div className="w-full">
        <MetricCard
          title="Tracks Occupied"
          value={245}
          subtitle="Currently in use"
          status="neutral"
          progress={65}
          trend="stable"
        />
      </div>

      <div className="w-full">
        <MetricCard
          title="Tracks Under Construction"
          value={18}
          subtitle="Maintenance & upgrades"
          status="warning"
          trend="down"
        />
      </div>

      {/* AI Decision Support */}
      <div className="w-full">
        <MetricCard
          title="AI Recommendations"
          value={24}
          subtitle="Active optimization suggestions"
          status="success"
          trend="up"
        />
      </div>
    </div>
  );
};