import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], highlighted: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 32}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>Choose your plan</h1>
      <div style={{display: 'flex', gap: 4, padding: 4, border: '1px solid #ddd', borderRadius: 8}}>
        {(['monthly', 'annual'] as const).map(b => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            style={{padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', background: billing === b ? '#0066ff' : 'transparent', color: billing === b ? '#fff' : '#333', fontWeight: 500, fontSize: 14}}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', maxWidth: 900}}>
        {plans.map(plan => (
          <div key={plan.name} style={{border: plan.highlighted ? '2px solid #0066ff' : '1px solid #e5e5e5', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12}}>
            <h3 style={{fontSize: 18, fontWeight: 600}}>{plan.name}</h3>
            <div style={{fontSize: 32, fontWeight: 700}}>
              ${billing === 'monthly' ? plan.monthly : plan.annual}
              <span style={{fontSize: 14, color: '#666', fontWeight: 400}}>/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #e5e5e5'}} />
            <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6, flex: 1}}>
              {plan.features.map(f => <li key={f} style={{fontSize: 14}}>{f}</li>)}
            </ul>
            <button style={{padding: '10px 20px', borderRadius: 6, border: plan.highlighted ? 'none' : '1px solid #ddd', background: plan.highlighted ? '#0066ff' : 'transparent', color: plan.highlighted ? '#fff' : '#333', cursor: 'pointer', fontWeight: 500}}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
