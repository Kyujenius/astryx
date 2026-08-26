import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const t = setTimeout(() => setState('error'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card padding={3}>
      <div className="flex flex-col gap-3">
        <Heading level={3}>Revenue</Heading>
        {state === 'loading' && (
          <div className="flex flex-col gap-2">
            <Skeleton width="60%" height={24} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="40%" height={16} />
          </div>
        )}
        {state === 'error' && (
          <div className="flex flex-col gap-2">
            <Banner variant="error">Failed to load revenue data.</Banner>
            <Button variant="outlined" onPress={() => setState('loading')}>Retry</Button>
          </div>
        )}
        {state === 'data' && (
          <div className="flex flex-col gap-1">
            <Text size="xl" weight="bold">$12,450</Text>
            <Text color="secondary">+12% from last month</Text>
          </div>
        )}
      </div>
    </Card>
  );
}
