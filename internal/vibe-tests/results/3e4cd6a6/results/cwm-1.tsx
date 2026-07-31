import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', '24/7 support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{padding: 32, maxWidth: 900, margin: '0 auto'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: 28, fontWeight: 'bold', margin: 0}}>Choose your plan</h2>
          <p style={{color: '#666'}}>Start free, upgrade when you need more.</p>
        </div>
        <div style={{display: 'inline-flex', border: '1px solid #ddd', borderRadius: 8, padding: 4}}>
          <button onClick={() => setBilling('monthly')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', background: billing === 'monthly' ? '#0066cc' : 'transparent', color: billing === 'monthly' ? 'white' : '#333'}}>Monthly</button>
          <button onClick={() => setBilling('annual')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', background: billing === 'annual' ? '#0066cc' : 'transparent', color: billing === 'annual' ? 'white' : '#333'}}>Annual (save 20%)</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
          {plans.map((plan) => (
            <div key={plan.name} style={{border: '1px solid #ddd', borderRadius: 12, padding: 24}}>
              <h3 style={{margin: '0 0 8px'}}>{plan.name}</h3>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16}}>
                <span style={{fontSize: 32, fontWeight: 'bold'}}>${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span style={{color: '#666'}}>/mo</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8}}>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button style={{width: '100%', padding: '10px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Choose {plan.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
