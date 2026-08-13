import {Card, CardContent} from '../components/ui/card';

const metrics = [
  {label: 'Total Revenue', value: '$128,430', trend: '+14.2%', positive: true},
  {label: 'Active Users', value: '8,942', trend: '+7.1%', positive: true},
  {label: 'Bounce Rate', value: '24.3%', trend: '-3.8%', positive: true},
  {label: 'Avg Session', value: '4m 32s', trend: '-1.2%', positive: false},
];

export default function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-3xl font-bold tabular-nums">{metric.value}</p>
            <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend} vs last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
