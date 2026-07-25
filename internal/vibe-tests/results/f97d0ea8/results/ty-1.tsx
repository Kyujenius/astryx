// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function PageTitle() {
  return (
    <VStack gap={2} padding={4}>
      <Heading level={1}>Welcome to Our Platform</Heading>
      <Text type="large" color="secondary">
        A brief description explaining what this page is about and how to get started.
      </Text>
    </VStack>
  );
}
