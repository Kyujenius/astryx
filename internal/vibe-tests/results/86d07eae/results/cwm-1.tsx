import {useState} from 'react';

const PLANS = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['50 projects', '10 GB storage', 'Priority support']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited projects', '100 GB storage', 'Dedicated support']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 32}}>
      <h2 style={{fontSize: 28, fontWeight: 700}}>Pricing</h2>
      <div style={{display: 'flex', gap: 4, background: '#f0f0f0', borderRadius: 6, padding: 4}}>
        <button
          type="button"
          onClick={() => setBilling('monthly')}
          style={{padding: '8px 16px', border: 'none', borderRadius: 4, cursor: 'pointer', background: billing === 'monthly' ? '#fff' : 'transparent', fontWeight: billing === 'monthly' ? 600 : 400}}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling('annual')}
          style={{padding: '8px 16px', border: 'none', borderRadius: 4, cursor: 'pointer', background: billing === 'annual' ? '#fff' : 'transparent', fontWeight: billing === 'annual' ? 600 : 400}}
        >
          Annual
        </button>
      </div>
      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center'}}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, width: 240, display: 'flex', flexDirection: 'column', gap: 12}}>
            <h3 style={{fontSize: 20, fontWeight: 600, margin: 0}}>{plan.name}</h3>
            <p style={{fontSize: 32, fontWeight: 700, margin: 0}}>
              ${billing === 'monthly' ? plan.monthly : plan.annual}
              <span style={{fontSize: 14, fontWeight: 400, color: '#666'}}>
                {billing === 'monthly' ? '/month' : '/year'}
              </span>
            </p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {plan.features.map((f) => (
                <li key={f} style={{padding: '4px 0', fontSize: 14}}>{f}</li>
              ))}
            </ul>
            <button type="button" style={{padding: '10px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
