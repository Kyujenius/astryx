import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';

export default function ProfileCard() {
  return (
    <Card padding={4} width={360}>
      <div className="flex gap-3 items-start">
        <Avatar name="Jane Cooper" size="lg" />
        <div className="flex flex-col gap-1">
          <Heading level={3}>Jane Cooper</Heading>
          <Text type="label" color="accent">Senior Engineer</Text>
          <Text type="body" color="secondary">
            Building design systems and developer tooling. Passionate about
            accessibility and component architecture.
          </Text>
        </div>
      </div>
    </Card>
  );
}
