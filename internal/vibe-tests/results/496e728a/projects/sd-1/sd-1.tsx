import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import {useState, useEffect} from 'react';

interface DashboardData {
  value: number;
  label: string;
  change: number;
}

interface DashboardWidgetProps {
  fetchData: () => Promise<DashboardData>;
}

export default function DashboardWidget({fetchData}: DashboardWidgetProps) {
  const [state, setState] = useState<'loading' | 'error' | 'data'>('loading');
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  const load = async () => {
    setState('loading');
    try {
      const result = await fetchData();
      setData(result);
      setState('data');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Card className="w-80">
      <CardHeader>
        {state === 'loading' && <Skeleton className="h-6 w-32" />}
        {state === 'data' && data && <CardTitle>{data.label}</CardTitle>}
      </CardHeader>
      <CardContent>
        {state === 'loading' && (
          <div className="space-y-3">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
        {state === 'error' && (
          <div className="text-center space-y-3">
            <p className="text-destructive">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={load}>Retry</Button>
          </div>
        )}
        {state === 'data' && data && (
          <div className="space-y-2">
            <p className="text-4xl font-bold">{data.value.toLocaleString()}</p>
            <p className={data.change >= 0 ? 'text-green-600' : 'text-red-600'}>
              {data.change >= 0 ? '+' : ''}{data.change}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
