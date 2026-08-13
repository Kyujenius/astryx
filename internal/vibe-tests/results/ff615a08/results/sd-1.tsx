import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Skeleton} from '../components/ui/skeleton';
import {Button} from '../components/ui/button';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'data' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <Card className="w-[400px]">
        <CardContent className="space-y-3 pt-6">
          <Skeleton className="h-6 w-[60%]" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card className="w-[400px] border-destructive">
        <CardContent className="space-y-3 pt-6">
          <p className="text-destructive font-medium">Failed to load data</p>
          <p className="text-sm text-muted-foreground">Something went wrong.</p>
          <Button size="sm" onClick={() => setState('loading')}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">$42,350</p>
        <p className="text-sm text-muted-foreground">+12.5% from last month</p>
      </CardContent>
    </Card>
  );
}
