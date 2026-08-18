import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, 1fr)',
    },
    gap: '16px',
    padding: '16px',
  },
});

const items = [
  { title: 'Analytics', description: 'Track your performance metrics and get insights.' },
  { title: 'Automation', description: 'Set up workflows to save time on repetitive tasks.' },
  { title: 'Security', description: 'Enterprise-grade protection for your data.' },
  { title: 'Integrations', description: 'Connect with hundreds of tools you already use.' },
  { title: 'Collaboration', description: 'Work together with your team in real time.' },
  { title: 'Support', description: '24/7 help from our dedicated support team.' },
];

export default function ResponsiveCards() {
  return (
    <div {...stylex.props(styles.grid)}>
      {items.map((item) => (
        <Card key={item.title} padding={4} elevation="low">
          <VStack gap={2}>
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </VStack>
        </Card>
      ))}
    </div>
  );
}
