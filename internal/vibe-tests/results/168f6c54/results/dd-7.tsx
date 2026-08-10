// Copyright (c) Meta Platforms, Inc. and affiliates.

const services = [
  {name: 'API Gateway', status: 'healthy', lastChecked: '2 min ago'},
  {name: 'Database', status: 'healthy', lastChecked: '1 min ago'},
  {name: 'Authentication', status: 'degraded', lastChecked: '30 sec ago'},
  {name: 'CDN', status: 'healthy', lastChecked: '5 min ago'},
  {name: 'Email Service', status: 'down', lastChecked: '10 sec ago'},
  {name: 'Search Index', status: 'healthy', lastChecked: '3 min ago'},
];

const statusColors: Record<string, string> = {healthy: '#22c55e', degraded: '#eab308', down: '#ef4444'};

export default function ServiceStatusList() {
  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, width: 480, boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
      <h3 style={{margin: '0 0 12px', fontSize: 18, fontWeight: 600}}>Service Status</h3>
      <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', margin: '0 0 16px'}} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {services.map(service => (
          <div key={service.name} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{width: 10, height: 10, borderRadius: '50%', background: statusColors[service.status]}} />
              <span style={{fontSize: 14, fontWeight: 500}}>{service.name}</span>
            </div>
            <span style={{fontSize: 12, color: '#6b7280'}}>{service.lastChecked}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
