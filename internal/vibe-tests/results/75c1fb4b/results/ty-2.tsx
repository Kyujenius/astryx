// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

interface BlogHeaderProps {
  title?: string;
  date?: string;
  author?: string;
}

export default function BlogHeader({
  title = 'The Future of Design Systems',
  date = 'August 11, 2026',
  author = 'Jane Smith',
}: BlogHeaderProps) {
  return (
    <Stack gap={3}>
      <Heading level={1} type="display-1">{title}</Heading>
      <Stack direction="horizontal" gap={2}>
        <Text type="supporting" color="secondary">{date}</Text>
        <Text type="supporting" color="secondary">by {author}</Text>
      </Stack>
    </Stack>
  );
}
