import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setState('error'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card padding={3}>
      <VStack gap={2}>
        <Heading level={3}>Revenue</Heading>

        {state === 'loading' && (
          <VStack gap={1}>
            <Skeleton width="60%" height={24} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="40%" height={16} />
          </VStack>
        )}

        {state === 'error' && (
          <VStack gap={2}>
            <Banner variant="error">
              Failed to load data. Please try again.
            </Banner>
            <Button variant="outlined" onPress={() => setState('loading')}>
              Retry
            </Button>
          </VStack>
        )}

        {state === 'data' && (
          <VStack gap={1}>
            <Text size="xl" weight="bold">$12,450</Text>
            <Text color="secondary">+12% from last month</Text>
          </VStack>
        )}
      </VStack>
    </Card>
  );
}
