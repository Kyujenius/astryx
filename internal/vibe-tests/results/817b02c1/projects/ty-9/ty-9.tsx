// Copyright (c) Meta Platforms, Inc. and affiliates.

interface Plan {name: string; price: string; period: string; isEnterprise?: boolean}

const plans: Plan[] = [
  {name: 'Starter', price: '$9', period: '/month'},
  {name: 'Pro', price: '$29', period: '/month'},
  {name: 'Enterprise', price: '$99', period: '/month', isEnterprise: true},
];

export default function ComparisonHeader() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
        {plans.map(plan => (
          <div key={plan.name} style={{textAlign: 'center'}}>
            <h3 style={{margin: '0 0 8px', fontSize: '18px', fontWeight: 600}}>{plan.name}</h3>
            {plan.isEnterprise ? (
              <div>
                <span style={{fontSize: '36px', fontWeight: 700}}>{plan.price}</span>
                <span style={{fontSize: '14px', color: '#666'}}>{plan.period}</span>
              </div>
            ) : (
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px'}}>
                <span style={{fontSize: '24px', fontWeight: 600}}>{plan.price}</span>
                <span style={{fontSize: '14px', color: '#666'}}>{plan.period}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', margin: 0}} />
    </div>
  );
}
