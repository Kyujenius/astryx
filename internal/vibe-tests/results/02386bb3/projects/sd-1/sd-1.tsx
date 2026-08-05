// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Spinner} from '@astryxdesign/core/Spinner';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');
  const [data, setData] = useState<{revenue: number; users: number; growth: number} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({revenue: 125000, users: 3420, growth: 12.5});
      setState('data');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <Spinner label="Loading dashboard data" />
          <Skeleton />
          <Skeleton />
        </div>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <Banner status="error" title="Failed to load data" />
          <Button label="Retry" onPress={() => setState('loading')} />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 space-y-4">
        <Heading level={3}>Dashboard Overview</Heading>
        <div className="grid grid-cols-3 gap-4">
          <div><Text>Revenue</Text><Heading level={4}>${data!.revenue.toLocaleString()}</Heading></div>
          <div><Text>Users</Text><Heading level={4}>{data!.users.toLocaleString()}</Heading></div>
          <div><Text>Growth</Text><Heading level={4}>{data!.growth}%</Heading></div>
        </div>
      </div>
    </Card>
  );
}