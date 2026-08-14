import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.7 ? 'error' : 'success');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <Card padding={4}>
        <VStack gap={3}>
          <Skeleton width={180} height={20} />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton width="100%" height={60} />
            <Skeleton width="100%" height={60} />
            <Skeleton width="100%" height={60} />
          </div>
        </VStack>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card padding={4}>
        <VStack gap={3}>
          <Banner type="error" title="Load failed">
            Unable to fetch metrics. Please try again.
          </Banner>
          <Button variant="secondary" onPress={() => setState('loading')}>
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
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-semibold">$12,450</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-xl font-semibold">142</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Growth</p>
            <p className="text-xl font-semibold text-green-600">+12.5%</p>
          </div>
        </div>
      </VStack>
    </Card>
  );
}
