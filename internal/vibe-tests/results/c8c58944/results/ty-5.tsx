// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

export default function HeroSection() {
  return (
    <VStack gap={4} padding={8} hAlign="center">
      <Heading level={1} type="display-1" justify="center">
        Build faster with Astryx
      </Heading>
      <Text type="large" color="secondary" justify="center">
        A modern design system that helps you ship beautiful, accessible
        interfaces in record time. Focus on what matters.
      </Text>
      <Button label="Get Started" variant="primary" size="lg" />
    </VStack>
  );
}
