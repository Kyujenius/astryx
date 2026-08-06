import {Card, CardContent} from '@/components/ui/card';

export default function MetricCard({label = 'Total Revenue', value = '$12,340.56', change = '+12% from last month'}) {
  return (
    <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">{label}</p><p className="text-3xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{change}</p></CardContent></Card>
  );
}