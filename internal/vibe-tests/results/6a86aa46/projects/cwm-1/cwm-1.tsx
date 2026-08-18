import { useState } from 'react';

const plans = [
  { name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support'] },
  { name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'] },
  { name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SSO', 'SLA'] },
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24 }}>Choose your plan</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        <span style={{ fontWeight: !isAnnual ? 'bold' : 'normal' }}>Monthly</span>
        <button
          role="switch"
          aria-checked={isAnnual}
          onClick={() => setIsAnnual(!isAnnual)}
          style={{ width: 48, height: 24, borderRadius: 12, background: isAnnual ? '#0066cc' : '#ccc', border: 'none', position: 'relative', cursor: 'pointer' }}
        >
          <span style={{ position: 'absolute', top: 2, left: isAnnual ? 26 : 2, width: 20, height: 20, borderRadius: 10, background: 'white', transition: 'left 0.2s' }} />
        </button>
        <span style={{ fontWeight: isAnnual ? 'bold' : 'normal' }}>Annual</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{plan.name}</h3>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 'bold' }}>${isAnnual ? plan.annual : plan.monthly}</span>
              <span style={{ color: '#666' }}>/{isAnnual ? 'year' : 'month'}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ padding: '4px 0' }}>✓ {f}</li>
              ))}
            </ul>
            <button style={{ width: '100%', padding: '10px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
