import * as React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Button} from '../components/ui/button';
import {Alert, AlertDescription, AlertTitle} from '../components/ui/alert';
import {Loader2, AlertCircle} from 'lucide-react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = React.useState<State>('loading');
  const [data, setData] = React.useState<{users: number; revenue: string; orders: number} | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.5) {
        setData({users: 1234, revenue: '$12,345', orders: 89});
        setState('success');
      } else {
        setState('error');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => {
      setData({users: 1234, revenue: '$12,345', orders: 89});
      setState('success');
    }, 1500);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {state === 'loading' && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Loading data...</span>
          </div>
        )}
        {state === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to load data</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              Something went wrong.
              <Button variant="outline" size="sm" onClick={retry}>Retry</Button>
            </AlertDescription>
          </Alert>
        )}
        {state === 'success' && data && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Users</p>
              <p className="text-2xl font-bold">{data.users}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">{data.revenue}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Orders</p>
              <p className="text-2xl font-bold">{data.orders}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
