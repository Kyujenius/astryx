// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';

export default function ProfileCard() {
  return (
    <Card padding={4} maxWidth={360} elevation="low">
      <Stack gap={3} vAlign="center">
        <Avatar name="Alex Johnson" size="xl" />
        <Heading level={3}>Alex Johnson</Heading>
        <Text type="label" color="accent">Senior Product Designer</Text>
        <Text>Passionate about creating intuitive and accessible digital experiences.</Text>
        <Text type="supporting" color="secondary">Joined March 2021</Text>
      </Stack>
    </Card>
  );
}
