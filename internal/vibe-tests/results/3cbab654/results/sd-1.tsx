import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

interface DashboardData {
  users: number;
  revenue: string;
  orders: number;
}

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
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
    <Card padding={4}>
      <Stack gap={3}>
        <Text type="display-3">Dashboard</Text>
        {state === 'loading' && (
          <Stack gap={2} hAlign="center" padding={4}>
            <Spinner label="Loading data..." />
          </Stack>
        )}
        {state === 'error' && (
          <Banner
            status="error"
            title="Failed to load data"
            description="Something went wrong while fetching dashboard metrics."
            endContent={<Button label="Retry" variant="secondary" onClick={retry} />}
          />
        )}
        {state === 'success' && data && (
          <Stack gap={2}>
            <Text type="body">Active Users: {data.users}</Text>
            <Text type="body">Revenue: {data.revenue}</Text>
            <Text type="body">Orders: {data.orders}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
