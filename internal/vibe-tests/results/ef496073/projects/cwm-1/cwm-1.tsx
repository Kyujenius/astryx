import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'SSO', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{fontFamily: 'system-ui', textAlign: 'center', padding: 32}}>
      <h2 style={{fontSize: 28, fontWeight: 700, marginBottom: 16}}>Pricing</h2>
      <div style={{display: 'inline-flex', gap: 0, marginBottom: 32, borderRadius: 6, border: '1px solid #e5e7eb', overflow: 'hidden'}}>
        {(['monthly', 'annual'] as const).map((b) => (
          <button key={b} onClick={() => setBilling(b)} style={{padding: '8px 20px', border: 'none', backgroundColor: billing === b ? '#2563eb' : 'white', color: billing === b ? 'white' : '#333', cursor: 'pointer', fontWeight: 500}}>
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
      <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{width: 280, border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, textAlign: 'left'}}>
            <h3 style={{fontSize: 20, fontWeight: 600, marginBottom: 8}}>{plan.name}</h3>
            <div style={{marginBottom: 16}}>
              <span style={{fontSize: 32, fontWeight: 700}}>${billing === 'monthly' ? plan.monthly : plan.annual}</span>
              <span style={{color: '#666'}}>/month</span>
            </div>
            {billing === 'annual' && (
              <span style={{display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 4, fontSize: 12, marginBottom: 16}}>
                Save {Math.round((1 - plan.annual / plan.monthly) * 100)}%
              </span>
            )}
            <ul style={{listStyle: 'none', padding: 0, marginBottom: 24}}>
              {plan.features.map((f) => <li key={f} style={{padding: '4px 0', fontSize: 14}}>{f}</li>)}
            </ul>
            <button style={{width: '100%', padding: '10px 16px', border: plan.name === 'Pro' ? 'none' : '1px solid #ccc', borderRadius: 4, backgroundColor: plan.name === 'Pro' ? '#2563eb' : 'white', color: plan.name === 'Pro' ? 'white' : '#333', cursor: 'pointer', fontWeight: 500}}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
