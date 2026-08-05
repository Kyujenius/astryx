// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState, useEffect} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';

export default function DashboardWidget() {
  const [state, setState] = useState<'loading' | 'error' | 'data'>('loading');
  const [data, setData] = useState<{revenue: number; users: number; growth: number} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({revenue: 125000, users: 3420, growth: 12.5});
      setState('data');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (<Card className="max-w-lg"><CardContent className="p-6 space-y-4"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></CardContent></Card>);
  }
  if (state === 'error') {
    return (<Card className="max-w-lg"><CardContent className="p-6"><Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Failed to load data</AlertDescription></Alert><Button onClick={() => setState('loading')} className="mt-4">Retry</Button></CardContent></Card>);
  }
  return (
    <Card className="max-w-lg">
      <CardHeader><CardTitle>Dashboard Overview</CardTitle></CardHeader>
      <CardContent><div className="grid grid-cols-3 gap-4">{[['Revenue', `$${data!.revenue.toLocaleString()}`], ['Users', data!.users.toLocaleString()], ['Growth', `${data!.growth}%`]].map(([label, val]) => (<div key={label}><p className="text-sm text-muted-foreground">{label}</p><p className="text-2xl font-bold">{val}</p></div>))}</div></CardContent>
    </Card>
  );
}