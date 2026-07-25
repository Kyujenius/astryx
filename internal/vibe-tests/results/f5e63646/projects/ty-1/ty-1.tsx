// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function PageTitle() {
  return (
    <div className="p-8">
      <VStack gap={2}>
        <Heading level={1}>Welcome to Our Platform</Heading>
        <Text type="large" color="secondary">
          A short description about what this page covers and how to get started.
        </Text>
      </VStack>
    </div>
  );
}
