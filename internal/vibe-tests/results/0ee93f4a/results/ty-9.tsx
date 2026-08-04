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
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #e0e0e0'}}>
      {plans.map((plan) => (
        <div key={plan.name} style={{padding: 24, textAlign: 'center'}}>
          <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 8}}>{plan.name}</h3>
          <div style={{fontSize: plan.name === 'Enterprise' ? 32 : 24, fontWeight: 700}}>
            {plan.price}
            {plan.period && <span style={{fontSize: 14, fontWeight: 400, color: '#666'}}>{plan.period}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
