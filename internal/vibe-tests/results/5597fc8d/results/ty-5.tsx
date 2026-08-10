// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 px-8 text-center">
      <Heading level={1} type="display-1">
        Build faster with Astryx
      </Heading>
      <Text type="large" color="secondary">
        A modern design system that helps you ship beautiful, accessible
        interfaces in record time. Focus on what matters.
      </Text>
      <Button label="Get Started" variant="primary" size="lg" />
    </div>
  );
}
