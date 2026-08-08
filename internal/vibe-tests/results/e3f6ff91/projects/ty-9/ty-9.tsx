// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Divider} from '@astryxdesign/core/Divider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  column: {
    textAlign: 'center',
  },
});

interface Plan {
  name: string;
  price: string;
  period: string;
  isEnterprise?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', price: '$9', period: '/month'},
  {name: 'Pro', price: '$29', period: '/month'},
  {name: 'Enterprise', price: '$99', period: '/month', isEnterprise: true},
];

export default function ComparisonHeader() {
  return (
    <Stack gap={4}>
      <div {...stylex.props(styles.grid)}>
        {plans.map(plan => (
          <Stack key={plan.name} gap={2} hAlign="center" {...stylex.props(styles.column)}>
            <Heading level={3}>{plan.name}</Heading>
            {plan.isEnterprise ? (
              <Heading level={1} type="display-2">{plan.price}<Text type="supporting">{plan.period}</Text></Heading>
            ) : (
              <Stack direction="horizontal" gap={0.5} vAlign="end" hAlign="center">
                <Heading level={2}>{plan.price}</Heading>
                <Text type="supporting" color="secondary">{plan.period}</Text>
              </Stack>
            )}
          </Stack>
        ))}
      </div>
      <Divider />
    </Stack>
  );
}
