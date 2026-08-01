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
          <div className="flex items-center justify-center py-8">
            <Spinner label="Loading data..." />
          </div>
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
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <Text type="supporting" color="secondary">Users</Text>
              <Text type="large" weight="bold">{data.users}</Text>
            </div>
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <Text type="supporting" color="secondary">Revenue</Text>
              <Text type="large" weight="bold">{data.revenue}</Text>
            </div>
            <div className="rounded-lg bg-purple-50 p-3 text-center">
              <Text type="supporting" color="secondary">Orders</Text>
              <Text type="large" weight="bold">{data.orders}</Text>
            </div>
          </div>
        )}
      </Stack>
    </Card>
  );
}
