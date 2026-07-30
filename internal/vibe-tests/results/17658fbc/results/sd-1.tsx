import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Loader2, AlertCircle} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

interface DashboardData { revenue: number; users: number; orders: number; }

export default function DashboardWidget() {
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = async () => {
    setState('loading');
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
      setState('success');
    } catch { setState('error'); }
  };

  useEffect(() => { fetchData(); }, []);

  if (state === 'loading') return (
    <Card><CardContent className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2">Loading...</span></CardContent></Card>
  );

  if (state === 'error') return (
    <Card><CardContent className="space-y-4 pt-6">
      <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Failed to load data.</AlertDescription></Alert>
      <Button variant="outline" onClick={fetchData}>Retry</Button>
    </CardContent></Card>
  );

  return (
    <Card><CardHeader><CardTitle>Dashboard</CardTitle></CardHeader><CardContent className="space-y-4">
      <div><p className="text-sm font-medium text-muted-foreground">Revenue</p><p className="text-2xl font-bold">${data?.revenue.toLocaleString()}</p></div>
      <div><p className="text-sm font-medium text-muted-foreground">Active Users</p><p className="text-2xl font-bold">{data?.users.toLocaleString()}</p></div>
      <div><p className="text-sm font-medium text-muted-foreground">Orders</p><p className="text-2xl font-bold">{data?.orders.toLocaleString()}</p></div>
    </CardContent></Card>
  );
}
