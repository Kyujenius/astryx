import {Card} from '@astryxdesign/core/Card';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {useState, useEffect} from 'react';

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
  const [error, setError] = useState('');

  const load = async () => {
    setState('loading');
    try {
      const result = await fetchData();
      setData(result);
      setState('data');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Card>
      <div className="w-80 min-h-[200px]">
        {state === 'loading' && (
          <div className="flex flex-col gap-3">
            <Skeleton height={24} width="60%" />
            <Skeleton height={48} width="40%" />
            <Skeleton height={16} width="80%" />
          </div>
        )}
        {state === 'error' && (
          <div className="flex flex-col items-center gap-3 p-6">
            <Text>Something went wrong</Text>
            <Text>{error}</Text>
            <Button variant="outlined" onPress={load}>Retry</Button>
          </div>
        )}
        {state === 'data' && data && (
          <div className="flex flex-col gap-3">
            <Heading level={3}>{data.label}</Heading>
            <span className="text-4xl font-bold">{data.value.toLocaleString()}</span>
            <Text>
              {data.change >= 0 ? '+' : ''}{data.change}% from last period
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
