import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Banner} from '@astryxdesign/core/Banner';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'data' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <Card width={400} padding={4}>
        <div className="flex flex-col gap-3">
          <Skeleton width="60%" height={24} />
          <Skeleton width="100%" height={48} index={1} />
          <Skeleton width="80%" height={16} index={2} />
        </div>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card width={400} padding={4}>
        <Banner
          status="error"
          title="Failed to load data"
          description="Something went wrong while fetching dashboard data."
          endContent={<Button label="Retry" size="sm" onClick={() => setState('loading')} />}
        />
      </Card>
    );
  }

  return (
    <Card width={400} padding={4}>
      <div className="flex flex-col gap-2">
        <Heading level={3}>Monthly Revenue</Heading>
        <Text type="display-2" weight="bold" as="p" display="block">$42,350</Text>
        <Text type="supporting" color="secondary" as="p" display="block">+12.5% from last month</Text>
      </div>
    </Card>
  );
}
