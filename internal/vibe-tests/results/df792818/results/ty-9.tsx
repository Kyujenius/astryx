// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Separator} from '@/components/ui/separator';

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
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {plans.map(plan => (
          <div key={plan.name} className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            {plan.isEnterprise ? (
              <div>
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
            ) : (
              <div className="flex items-end justify-center gap-1">
                <span className="text-2xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <Separator />
    </div>
  );
}
