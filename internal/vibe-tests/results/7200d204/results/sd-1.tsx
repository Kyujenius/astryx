import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Banner} from '@astryxdesign/core/Banner';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'data' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setState('loading');
    setTimeout(() => setState('data'), 1500);
  };

  return (
    <Card>
      <Stack gap="md">
        <Heading level={3}>Revenue</Heading>
        {state === 'loading' && (
          <Stack align="center" gap="sm">
            <Spinner size="md" />
            <Text color="secondary">Loading data...</Text>
          </Stack>
        )}
        {state === 'error' && (
          <Stack gap="sm">
            <Banner variant="error">Failed to load revenue data.</Banner>
            <Button variant="outlined" size="sm" onPress={handleRetry}>Retry</Button>
          </Stack>
        )}
        {state === 'data' && (
          <Stack gap="xs">
            <Heading level={2}>$42,389</Heading>
            <Text color="secondary" size="sm">+12% from last month</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
