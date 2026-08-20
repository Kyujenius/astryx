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
      const shouldError = Math.random() < 0.3;
      if (shouldError) {
        setState('error');
      } else {
        setData({revenue: 42500, orders: 187, customers: 1243});
        setState('success');
      }
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state === 'loading') {
    return (
      <Card padding={4}>
        <Stack gap={3} hAlign="center">
          <Spinner size="lg" label="Loading dashboard data..." />
        </Stack>
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
          endContent={
            <Button label="Retry" variant="secondary" size="sm" onClick={fetchData} />
          }
        />
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <Stack gap={3}>
        <Heading level={3}>Dashboard</Heading>
        <Stack gap={2}>
          <Text>Revenue: ${data!.revenue.toLocaleString()}</Text>
          <Text>Orders: {data!.orders}</Text>
          <Text>Customers: {data!.customers.toLocaleString()}</Text>
        </Stack>
      </Stack>
    </Card>
  );
}
