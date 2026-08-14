import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.7 ? 'error' : 'success');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load dashboard data.</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => setState('loading')}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold">$12,450</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="text-2xl font-bold">142</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Growth</p>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
