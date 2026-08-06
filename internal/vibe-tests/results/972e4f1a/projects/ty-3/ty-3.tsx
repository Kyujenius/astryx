import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

interface MetricCardProps { label?: string; value?: string; change?: string; }

export default function MetricCard({label = 'Total Revenue', value = '$12,340.56', change = '+12% from last month'}: MetricCardProps) {
  return (
    <Card padding={4} elevation="low">
      <Stack gap={1}>
        <Text variant="bodySm" color="secondary">{label}</Text>
        <Text variant="displayLg">{value}</Text>
        <Text variant="bodySm" color="secondary">{change}</Text>
      </Stack>
    </Card>
  );
}