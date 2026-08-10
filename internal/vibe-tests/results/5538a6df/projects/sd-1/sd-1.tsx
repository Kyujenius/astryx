// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Loader2} from 'lucide-react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => setState('success'), 1500);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[120px] gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading data...</p>
          </div>
        )}
        {state === 'error' && (
          <div className="flex flex-col gap-3">
            <Alert variant="destructive">
              <AlertDescription>Failed to load revenue data. Please try again.</AlertDescription>
            </Alert>
            <Button variant="outline" onClick={retry}>Retry</Button>
          </div>
        )}
        {state === 'success' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$48,290</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-xl font-semibold text-green-600">+12.5%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
