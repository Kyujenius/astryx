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
      const shouldError = Math.random() > 0.7;
      if (shouldError) {
        setState('error');
      } else {
        setData({revenue: 125000, users: 3420, growth: 12.5});
        setState('data');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => {
      setData({revenue: 125000, users: 3420, growth: 12.5});
      setState('data');
    }, 1500);
  };

  if (state === 'loading') {
    return (
      <Card>
        <Spinner label="Loading dashboard data" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card>
        <Banner status="error" title="Failed to load dashboard data" />
        <Button label="Retry" onPress={retry} />
      </Card>
    );
  }

  return (
    <Card>
      <Heading level={3}>Dashboard Overview</Heading>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
        <div>
          <Text>Revenue</Text>
          <Heading level={4}>${data!.revenue.toLocaleString()}</Heading>
        </div>
        <div>
          <Text>Active Users</Text>
          <Heading level={4}>{data!.users.toLocaleString()}</Heading>
        </div>
        <div>
          <Text>Growth</Text>
          <Heading level={4}>{data!.growth}%</Heading>
        </div>
      </div>
    </Card>
  );
}