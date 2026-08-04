// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

const plans = [
  {name: 'Free', price: '$0', period: '/mo'},
  {name: 'Starter', price: '$19', period: '/mo'},
  {name: 'Pro', price: '$49', period: '/mo'},
  {name: 'Enterprise', price: 'Custom', period: ''},
];

export default function ComparisonHeader() {
  return (
    <div className="grid grid-cols-4 border-b">
      {plans.map((plan) => (
        <div key={plan.name} className="p-6 text-center space-y-2">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <div className={plan.name === 'Enterprise' ? 'text-4xl font-bold' : 'text-2xl font-bold'}>
            {plan.price}
            {plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
