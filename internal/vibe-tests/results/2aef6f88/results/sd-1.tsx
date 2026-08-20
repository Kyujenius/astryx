import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {Loader2, AlertCircle} from 'lucide-react';

type WidgetState = 'loading' | 'error' | 'success';

interface DashboardData {
  revenue: number;
  orders: number;
  customers: number;
}

export default function DashboardWidget() {
  const [state, setState] = useState<WidgetState>('loading');
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = () => {
    setState('loading');
    setTimeout(() => {
      if (Math.random() < 0.3) {
        setState('error');
      } else {
        setData({revenue: 42500, orders: 187, customers: 1243});
        setState('success');
      }
    }, 1500);
  };

  useEffect(() => { fetchData(); }, []);

  if (state === 'loading') {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </CardContent>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load dashboard data.</span>
              <Button size="sm" variant="outline" onClick={fetchData}>Retry</Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold">${data!.revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="text-2xl font-bold">{data!.orders}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Customers</p>
            <p className="text-2xl font-bold">{data!.customers.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
