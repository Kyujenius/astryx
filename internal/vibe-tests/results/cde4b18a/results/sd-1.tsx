import {useState, useEffect} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

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
      <Card padding={4}>
        <div className="flex justify-center py-8">
          <Spinner size="lg" label="Loading dashboard data..." />
        </div>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card padding={4}>
        <Banner
          status="error"
          title="Failed to load dashboard data"
          description="Check your connection and try again."
          endContent={<Button label="Retry" variant="secondary" size="sm" onClick={fetchData} />}
        />
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <Stack gap={3}>
        <Heading level={3}>Dashboard</Heading>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Text color="secondary">Revenue</Text>
            <Text><strong>${data!.revenue.toLocaleString()}</strong></Text>
          </div>
          <div className="text-center">
            <Text color="secondary">Orders</Text>
            <Text><strong>{data!.orders}</strong></Text>
          </div>
          <div className="text-center">
            <Text color="secondary">Customers</Text>
            <Text><strong>{data!.customers.toLocaleString()}</strong></Text>
          </div>
        </div>
      </Stack>
    </Card>
  );
}
