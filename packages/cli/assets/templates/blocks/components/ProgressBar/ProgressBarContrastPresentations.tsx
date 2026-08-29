// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {VStack} from '@astryxdesign/core/Layout';

export default function ProgressBarContrastPresentations() {
  return (
    <VStack gap={4} style={{width: 300}}>
      <ProgressBar value={60} label="Standalone — graphic only" />
      <ProgressBar
        value={60}
        label="Supplemental — visible value"
        hasValueLabel
        contrast="supplemental"
      />
    </VStack>
  );
}
