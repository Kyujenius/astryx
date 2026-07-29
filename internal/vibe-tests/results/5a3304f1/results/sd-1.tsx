import {Card} from '@astryxdesign/core/Card';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';
import {useState, useEffect} from 'react';

const styles = stylex.create({
  widget: {
    width: 320,
    minHeight: 200,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  errorState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    padding: 24,
  },
  metric: {
    fontSize: 36,
    fontWeight: 700,
  },
});

type WidgetState = 'loading' | 'error' | 'data';

interface DashboardData {
  value: number;
  label: string;
  change: number;
}

interface DashboardWidgetProps {
  fetchData: () => Promise<DashboardData>;
}

export default function DashboardWidget({fetchData}: DashboardWidgetProps) {
  const [state, setState] = useState<WidgetState>('loading');
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string>('');

  const load = async () => {
    setState('loading');
    try {
      const result = await fetchData();
      setData(result);
      setState('data');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data');
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Card xstyle={styles.widget}>
      {state === 'loading' && (
        <div {...stylex.props(styles.content)}>
          <Skeleton height={24} width="60%" />
          <Skeleton height={48} width="40%" />
          <Skeleton height={16} width="80%" />
        </div>
      )}
      {state === 'error' && (
        <div {...stylex.props(styles.errorState)}>
          <Text color="error">Something went wrong</Text>
          <Text>{error}</Text>
          <Button variant="outlined" onPress={load}>Retry</Button>
        </div>
      )}
      {state === 'data' && data && (
        <div {...stylex.props(styles.content)}>
          <Heading level={3}>{data.label}</Heading>
          <span {...stylex.props(styles.metric)}>{data.value.toLocaleString()}</span>
          <Text color={data.change >= 0 ? 'success' : 'error'}>
            {data.change >= 0 ? '+' : ''}{data.change}% from last period
          </Text>
        </div>
      )}
    </Card>
  );
}
