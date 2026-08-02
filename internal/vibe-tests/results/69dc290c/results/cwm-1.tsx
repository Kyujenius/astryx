import React, {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 29, annual: 290, features: ['5 users', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 79, annual: 790, features: ['25 users', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 199, annual: 1990, features: ['Unlimited users', '1TB storage', 'Dedicated support', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{maxWidth: '900px', margin: '0 auto', padding: '48px 16px'}}>
      <h1 style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '24px'}}>Pricing</h1>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '32px'}}>
        <div style={{display: 'inline-flex', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden'}}>
          <button onClick={() => setBilling('monthly')} style={{padding: '8px 20px', backgroundColor: billing === 'monthly' ? '#3b82f6' : '#fff', color: billing === 'monthly' ? '#fff' : '#333', border: 'none', cursor: 'pointer'}}>Monthly</button>
          <button onClick={() => setBilling('annual')} style={{padding: '8px 20px', backgroundColor: billing === 'annual' ? '#3b82f6' : '#fff', color: billing === 'annual' ? '#fff' : '#333', border: 'none', cursor: 'pointer'}}>Annual</button>
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px'}}>
            <h3 style={{fontSize: '20px', fontWeight: '600'}}>{plan.name}</h3>
            {billing === 'annual' && <span style={{backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>Save 17%</span>}
            <p style={{fontSize: '28px', fontWeight: 'bold', margin: '12px 0'}}>
              ${billing === 'monthly' ? plan.monthly : plan.annual}/{billing === 'monthly' ? 'mo' : 'yr'}
            </p>
            <ul style={{listStyle: 'none', padding: 0, margin: '16px 0'}}>
              {plan.features.map((f) => <li key={f} style={{padding: '4px 0'}}>&#10003; {f}</li>)}
            </ul>
            <button style={{width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
