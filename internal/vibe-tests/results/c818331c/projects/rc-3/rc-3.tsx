import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const ITEMS = [
  {title: 'Design', description: 'Create beautiful interfaces with consistent patterns.'},
  {title: 'Develop', description: 'Build accessible components with type-safe props.'},
  {title: 'Deploy', description: 'Ship production-ready features with confidence.'},
];

export default function ResponsiveCards() {
  return (
    <div className="p-6">
      <Heading level={2}>Our Process</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {ITEMS.map((item) => (
          <Card key={item.title} padding={4}>
            <div className="flex flex-col gap-2">
              <Heading level={3}>{item.title}</Heading>
              <Text color="secondary">{item.description}</Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
