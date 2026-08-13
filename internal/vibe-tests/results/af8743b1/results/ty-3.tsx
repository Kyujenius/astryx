import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
});

const metrics = [
  {label: 'Total Revenue', value: '$128,430', trend: '+14.2%', positive: true},
  {label: 'Active Users', value: '8,942', trend: '+7.1%', positive: true},
  {label: 'Bounce Rate', value: '24.3%', trend: '-3.8%', positive: true},
  {label: 'Avg Session', value: '4m 32s', trend: '-1.2%', positive: false},
];

export default function MetricsDashboard() {
  return (
    <div {...stylex.props(styles.grid)}>
      {metrics.map((metric) => (
        <Card key={metric.label} padding={4}>
          <div {...stylex.props(styles.metric)}>
            <Text type="supporting" color="secondary">{metric.label}</Text>
            <Text type="display-2" weight="bold" hasTabularNumbers>{metric.value}</Text>
            <div {...stylex.props(styles.trend)}>
              <Text
                type="supporting"
                color={metric.positive ? 'primary' : 'primary'}
              >
                {metric.trend} vs last month
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
