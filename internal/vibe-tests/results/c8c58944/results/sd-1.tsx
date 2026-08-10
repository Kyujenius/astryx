// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => setState('success'), 1500);
  };

  return (
    <Card padding={4} width={400} elevation="low">
      <VStack gap={3}>
        <Heading level={4}>Revenue Overview</Heading>
        {state === 'loading' && (
          <VStack gap={2} hAlign="center" minHeight={120}>
            <Spinner size="lg" label="Loading data..." />
          </VStack>
        )}
        {state === 'error' && (
          <VStack gap={2}>
            <Banner variant="error">Failed to load revenue data. Please try again.</Banner>
            <Button label="Retry" variant="secondary" onClick={retry} />
          </VStack>
        )}
        {state === 'success' && (
          <VStack gap={2}>
            <HStack gap={4} hAlign="between">
              <VStack gap={0.5}>
                <Text type="supporting" color="secondary">Total Revenue</Text>
                <Heading level={3}>$48,290</Heading>
              </VStack>
              <VStack gap={0.5}>
                <Text type="supporting" color="secondary">Growth</Text>
                <Text type="large" color="accent">+12.5%</Text>
              </VStack>
            </HStack>
            <Text type="supporting" color="secondary">Last updated: 2 minutes ago</Text>
          </VStack>
        )}
      </VStack>
    </Card>
  );
}
