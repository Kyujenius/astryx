// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
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
      <div className="flex flex-col gap-3">
        <Heading level={4}>Revenue Overview</Heading>
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            <Spinner size="lg" label="Loading data..." />
          </div>
        )}
        {state === 'error' && (
          <div className="flex flex-col gap-2">
            <Banner variant="error">Failed to load revenue data. Please try again.</Banner>
            <Button label="Retry" variant="secondary" onClick={retry} />
          </div>
        )}
        {state === 'success' && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <Text type="supporting" color="secondary">Total Revenue</Text>
                <Heading level={3}>$48,290</Heading>
              </div>
              <div className="flex flex-col gap-1">
                <Text type="supporting" color="secondary">Growth</Text>
                <Text type="large" color="accent">+12.5%</Text>
              </div>
            </div>
            <Text type="supporting" color="secondary">Last updated: 2 minutes ago</Text>
          </div>
        )}
      </div>
    </Card>
  );
}
