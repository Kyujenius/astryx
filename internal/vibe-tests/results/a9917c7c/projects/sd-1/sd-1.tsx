import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {useState, useEffect} from 'react';

interface DashboardData {
  revenue: number;
  users: number;
  orders: number;
}

export default function DashboardWidget() {
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = async () => {
    setState('loading');
    setData(null);
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
      setState('success');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state === 'loading') {
    return (
      <Card>
        <Stack gap={4} align="center">
          <Spinner label="Loading dashboard data..." />
        </Stack>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card>
        <Stack gap={4}>
          <Banner title="Failed to load dashboard" variant="error">
            <Text type="body">
              Something went wrong while fetching the data.
            </Text>
          </Banner>
          <Button label="Retry" variant="secondary" onClick={fetchData} />
        </Stack>
      </Card>
    );
  }

  return (
    <Card>
      <Stack gap={4}>
        <Heading level={3}>Dashboard</Heading>
        <Stack gap={2}>
          <Text type="label">Revenue</Text>
          <Text type="large">${data?.revenue.toLocaleString()}</Text>
        </Stack>
        <Stack gap={2}>
          <Text type="label">Active Users</Text>
          <Text type="large">{data?.users.toLocaleString()}</Text>
        </Stack>
        <Stack gap={2}>
          <Text type="label">Orders</Text>
          <Text type="large">{data?.orders.toLocaleString()}</Text>
        </Stack>
      </Stack>
    </Card>
  );
}
