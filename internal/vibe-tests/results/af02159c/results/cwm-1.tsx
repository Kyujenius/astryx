import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB', 'Priority support', 'API'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB', 'Dedicated manager', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 32, maxWidth: 900, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: 32}}>
        <h2 style={{fontSize: 28, fontWeight: 700, margin: '0 0 16px'}}>Choose your plan</h2>
        <div style={{display: 'inline-flex', background: '#f0f0f0', borderRadius: 8, padding: 4}} role="radiogroup" aria-label="Billing period">
          {(['monthly', 'annual'] as const).map((b) => (
            <button
              key={b}
              role="radio"
              aria-checked={billing === b}
              onClick={() => setBilling(b)}
              style={{
                padding: '6px 16px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: billing === b ? '#fff' : 'transparent',
                fontWeight: billing === b ? 600 : 400,
                boxShadow: billing === b ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </button>
          ))}
        </div>
        {billing === 'annual' && <p style={{color: '#16a34a', fontSize: 14, marginTop: 8}}>Save up to 20%</p>}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{border: plan.popular ? '2px solid #0066cc' : '1px solid #e0e0e0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <h3 style={{margin: 0, fontSize: 20}}>{plan.name}</h3>
                {plan.popular && <span style={{background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: 99, fontSize: 12, fontWeight: 500}}>Popular</span>}
              </div>
              <div style={{marginTop: 8}}>
                <span style={{fontSize: 32, fontWeight: 700}}>${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span style={{color: '#666'}}>/mo</span>
              </div>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #e0e0e0', margin: 0}} />
            <ul style={{listStyle: 'none', padding: 0, margin: 0, flex: 1}}>
              {plan.features.map((f) => (
                <li key={f} style={{padding: '4px 0', fontSize: 14}}>✓ {f}</li>
              ))}
            </ul>
            <button style={{
              width: '100%', padding: '10px', border: plan.popular ? 'none' : '1px solid #ccc',
              borderRadius: 6, background: plan.popular ? '#0066cc' : '#fff',
              color: plan.popular ? '#fff' : '#333', cursor: 'pointer', fontWeight: 500,
            }}>
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
