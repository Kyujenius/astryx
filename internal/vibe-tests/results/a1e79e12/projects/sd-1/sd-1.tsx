import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';
import {Button} from './components/ui/button';
import {Skeleton} from './components/ui/skeleton';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setState(Math.random() > 0.3 ? 'data' : 'error'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
      <CardContent>
        {state === 'loading' && (
          <div className="space-y-2"><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-48" /></div>
        )}
        {state === 'error' && (
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">Failed to load revenue data.</div>
            <Button variant="outline" size="sm" onClick={() => setState('loading')}>Retry</Button>
          </div>
        )}
        {state === 'data' && (
          <div><p className="text-3xl font-bold">$42,389</p><p className="text-sm text-muted-foreground">+12% from last month</p></div>
        )}
      </CardContent>
    </Card>
  );
}
