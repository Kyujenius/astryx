import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{padding: 32, fontFamily: 'system-ui', textAlign: 'center' as const}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 8}}>Choose your plan</h1>
      <p style={{color: '#666', marginBottom: 24}}>Start free, upgrade when you need more.</p>

      <div style={{display: 'inline-flex', background: '#f3f4f6', borderRadius: 8, padding: 4, marginBottom: 32}}>
        <button onClick={() => setBilling('monthly')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, background: billing === 'monthly' ? 'white' : 'transparent', boxShadow: billing === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}>Monthly</button>
        <button onClick={() => setBilling('annual')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, background: billing === 'annual' ? 'white' : 'transparent', boxShadow: billing === 'annual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}>Annual (save 20%)</button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto', textAlign: 'left' as const}}>
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthly : plan.annual;
          return (
            <div key={plan.name} style={{border: plan.popular ? '2px solid #2563eb' : '1px solid #e5e5e5', borderRadius: 12, padding: 24, background: 'white'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <h3 style={{margin: 0, fontSize: 18}}>{plan.name}</h3>
                {plan.popular && <span style={{background: '#2563eb', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600}}>Popular</span>}
              </div>
              <div style={{marginBottom: 16}}>
                <span style={{fontSize: 32, fontWeight: 700}}>${price}</span>
                <span style={{color: '#666'}}>/mo</span>
              </div>
              {billing === 'annual' && <p style={{fontSize: 13, color: '#2563eb', margin: '0 0 12px'}}>Billed ${price * 12}/year</p>}
              <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '16px 0'}} />
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 20px'}}>
                {plan.features.map(f => <li key={f} style={{padding: '4px 0', fontSize: 14}}>✓ {f}</li>)}
              </ul>
              <button style={{width: '100%', padding: '10px', border: plan.popular ? 'none' : '1px solid #ccc', borderRadius: 6, background: plan.popular ? '#2563eb' : 'white', color: plan.popular ? 'white' : '#333', cursor: 'pointer', fontWeight: 500}}>Get started</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
