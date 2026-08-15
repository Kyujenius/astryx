import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Divider} from '@astryxdesign/core/Divider';

export default function BlogPostHeader() {
  return (
    <Stack direction="vertical" gap={4} padding={6} maxWidth={720}>
      <Heading level={1} type="display-2">
        The Future of Design Systems in a Post-AI World
      </Heading>
      <Stack direction="horizontal" gap={3} vAlign="center">
        <Avatar
          src="https://i.pravatar.cc/48?u=author"
          name="Sarah Chen"
          size="md"
        />
        <Stack direction="vertical" gap={0}>
          <Text weight="medium">Sarah Chen</Text>
          <Text type="supporting">August 15, 2026</Text>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
}
