import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Spinner} from '@astryxdesign/core/Spinner';
import {useState, useEffect} from 'react';

type WidgetState = 'loading' | 'error' | 'success';

interface DashboardData {
  revenue: string;
  orders: number;
  growth: string;
}

export default function DashboardWidget() {
  const [state, setState] = useState<WidgetState>('loading');
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shouldError = Math.random() > 0.7;
      if (shouldError) {
        setState('error');
      } else {
        setData({revenue: '$12,450', orders: 142, growth: '+12.5%'});
        setState('success');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => {
      setData({revenue: '$12,450', orders: 142, growth: '+12.5%'});
      setState('success');
    }, 1500);
  };

  if (state === 'loading') {
    return (
      <Card padding={4}>
        <VStack gap={3}>
          <Skeleton width={200} height={24} />
          <HStack gap={4}>
            <Skeleton width={100} height={48} />
            <Skeleton width={100} height={48} />
            <Skeleton width={100} height={48} />
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card padding={4}>
        <VStack gap={3}>
          <Banner type="error" title="Failed to load data">
            Something went wrong while fetching dashboard metrics.
          </Banner>
          <Button variant="secondary" onPress={retry}>
            Retry
          </Button>
        </VStack>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <VStack gap={3}>
        <Heading level={3}>Revenue Overview</Heading>
        <HStack gap={4}>
          <VStack gap={0.5}>
            <Text type="supporting" color="secondary">Revenue</Text>
            <Heading level={4}>{data?.revenue}</Heading>
          </VStack>
          <VStack gap={0.5}>
            <Text type="supporting" color="secondary">Orders</Text>
            <Heading level={4}>{data?.orders}</Heading>
          </VStack>
          <VStack gap={0.5}>
            <Text type="supporting" color="secondary">Growth</Text>
            <Heading level={4} color="accent">{data?.growth}</Heading>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
}
