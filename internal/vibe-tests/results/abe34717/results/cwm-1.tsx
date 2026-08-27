import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'SSO', 'Custom contracts']},
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div style={{padding: 32, fontFamily: 'system-ui', textAlign: 'center'}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 16}}>Pricing</h1>
      <div style={{display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32}}>
        <button onClick={() => setIsAnnual(false)} style={{padding: '8px 16px', background: !isAnnual ? '#0066cc' : '#fff', color: !isAnnual ? '#fff' : '#333', border: '1px solid #0066cc', borderRadius: 4, cursor: 'pointer'}}>Monthly</button>
        <button onClick={() => setIsAnnual(true)} style={{padding: '8px 16px', background: isAnnual ? '#0066cc' : '#fff', color: isAnnual ? '#fff' : '#333', border: '1px solid #0066cc', borderRadius: 4, cursor: 'pointer'}}>Annual</button>
        {isAnnual && <span style={{background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500}}>Save 17%</span>}
      </div>
      <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
        {plans.map(plan => (
          <div key={plan.name} style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, width: 280, textAlign: 'left'}}>
            <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>{plan.name}</h3>
            <div style={{marginBottom: 16}}>
              <span style={{fontSize: 28, fontWeight: 700}}>${isAnnual ? plan.annual : plan.monthly}</span>
              <span style={{color: '#6b7280'}}>/{isAnnual ? 'year' : 'month'}</span>
            </div>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: 16}}>
              {plan.features.map(f => <li key={f} style={{padding: '4px 0', fontSize: 14}}>{f}</li>)}
            </ul>
            <button style={{width: '100%', padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Get started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
