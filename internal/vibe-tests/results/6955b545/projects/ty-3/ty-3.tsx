import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';

const metrics = [
  {label: 'Total Revenue', value: '$128,430', trend: '+14.2%', positive: true},
  {label: 'Active Users', value: '8,942', trend: '+7.1%', positive: true},
  {label: 'Bounce Rate', value: '24.3%', trend: '-3.8%', positive: true},
  {label: 'Avg Session', value: '4m 32s', trend: '-1.2%', positive: false},
];

export default function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {metrics.map((metric) => (
        <Card key={metric.label} padding={4}>
          <div className="flex flex-col gap-1">
            <Text type="supporting" color="secondary">{metric.label}</Text>
            <Text type="display-2" weight="bold" hasTabularNumbers>{metric.value}</Text>
            <Text type="supporting" color={metric.positive ? 'primary' : 'primary'}>
              {metric.trend} vs last month
            </Text>
          </div>
        </Card>
      ))}
    </div>
  );
}
