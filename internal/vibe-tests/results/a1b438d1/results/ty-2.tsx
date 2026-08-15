import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Divider} from '@astryxdesign/core/Divider';

export default function BlogPostHeader() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-3xl">
      <Heading level={1} type="display-2">
        The Future of Design Systems in a Post-AI World
      </Heading>
      <div className="flex items-center gap-3">
        <Avatar
          src="https://i.pravatar.cc/48?u=author"
          name="Sarah Chen"
          size="md"
        />
        <div className="flex flex-col">
          <Text weight="medium">Sarah Chen</Text>
          <Text type="supporting">August 15, 2026</Text>
        </div>
      </div>
      <Divider />
    </div>
  );
}
