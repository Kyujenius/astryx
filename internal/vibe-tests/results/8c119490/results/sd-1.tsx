import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const t = setTimeout(() => setState('error'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        {state === 'loading' && (
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        )}
        {state === 'error' && (
          <div className="space-y-3">
            <p className="text-destructive">Failed to load data.</p>
            <Button variant="outline" onClick={() => setState('loading')}>Retry</Button>
          </div>
        )}
        {state === 'data' && (
          <div className="space-y-1">
            <p className="text-2xl font-bold">$12,450</p>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
