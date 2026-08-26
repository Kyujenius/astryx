import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProfileCard() {
  return (
    <Card padding={4}>
      <div className="flex flex-col items-center gap-3">
        <Avatar src="https://i.pravatar.cc/150" name="Jane Smith" size="xl" />
        <div className="text-center">
          <Heading level={2}>Jane Smith</Heading>
          <Text color="secondary">Senior Product Designer</Text>
        </div>
        <div className="flex gap-1">
          <Badge>Design</Badge>
          <Badge>UX</Badge>
          <Badge>Research</Badge>
        </div>
        <Text align="center" color="secondary">
          Crafting intuitive interfaces that solve real problems.
        </Text>
      </div>
    </Card>
  );
}
