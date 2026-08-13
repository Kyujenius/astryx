import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, 1fr)',
    },
    gap: 16,
  },
});

const ITEMS = [
  {title: 'Design', description: 'Create beautiful interfaces with consistent patterns.'},
  {title: 'Develop', description: 'Build accessible components with type-safe props.'},
  {title: 'Deploy', description: 'Ship production-ready features with confidence.'},
];

export default function ResponsiveCards() {
  return (
    <VStack gap={4}>
      <Heading level={2}>Our Process</Heading>
      <div {...stylex.props(styles.grid)}>
        {ITEMS.map((item) => (
          <Card key={item.title} padding={4}>
            <VStack gap={2}>
              <Heading level={3}>{item.title}</Heading>
              <Text color="secondary">{item.description}</Text>
            </VStack>
          </Card>
        ))}
      </div>
    </VStack>
  );
}
