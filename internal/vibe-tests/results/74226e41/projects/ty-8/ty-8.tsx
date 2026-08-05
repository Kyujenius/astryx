// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Avatar} from '@astryxdesign/core/Avatar';

export default function ProfileCard() {
  return (
    <Card>
      <div style={{display: 'flex', gap: 16, padding: 24, alignItems: 'center'}}>
        <Avatar src="https://i.pravatar.cc/80?u=profile" name="Jane Doe" size="lg" />
        <div>
          <Heading level={3}>Jane Doe</Heading>
          <Text size="sm" color="secondary">Senior Software Engineer</Text>
          <Text>Passionate about building accessible, performant web applications. Loves TypeScript and design systems.</Text>
          <Text size="xs" color="tertiary">Joined March 2022</Text>
        </div>
      </div>
    </Card>
  );
}