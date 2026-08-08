// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Divider} from '@astryxdesign/core/Divider';

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
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {plans.map(plan => (
          <div key={plan.name} className="text-center flex flex-col items-center gap-2">
            <Heading level={3}>{plan.name}</Heading>
            {plan.isEnterprise ? (
              <Heading level={1} type="display-2">
                {plan.price}<Text type="supporting">{plan.period}</Text>
              </Heading>
            ) : (
              <div className="flex items-end gap-1">
                <Heading level={2}>{plan.price}</Heading>
                <Text type="supporting" color="secondary">{plan.period}</Text>
              </div>
            )}
          </div>
        ))}
      </div>
      <Divider />
    </div>
  );
}
