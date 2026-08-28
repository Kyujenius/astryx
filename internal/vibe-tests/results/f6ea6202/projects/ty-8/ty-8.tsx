import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Divider} from '@astryxdesign/core/Divider';

export default function ProfileCard() {
  return (
    <Card width={360} padding={4}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar name="Sarah Chen" size="lg" />
          <div className="flex flex-col gap-0.5">
            <Heading level={2}>Sarah Chen</Heading>
            <Text type="label" color="accent">Senior Engineer</Text>
          </div>
        </div>
        <Divider />
        <Text color="secondary">
          Passionate about accessible, performant UI. Previously at Stripe and Vercel. Loves hiking and baking.
        </Text>
        <Text type="supporting" color="secondary">Joined March 2024</Text>
      </div>
    </Card>
  );
}
