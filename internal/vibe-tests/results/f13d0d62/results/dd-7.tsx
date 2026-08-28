import React from 'react';

type ServiceStatus = 'healthy' | 'degraded' | 'down';

const services = [
  {name: 'API Gateway', status: 'healthy' as ServiceStatus, lastChecked: '2 min ago'},
  {name: 'Database Cluster', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
  {name: 'Cache Layer', status: 'degraded' as ServiceStatus, lastChecked: '5 min ago'},
  {name: 'Search Service', status: 'down' as ServiceStatus, lastChecked: '30 sec ago'},
  {name: 'Email Service', status: 'healthy' as ServiceStatus, lastChecked: '3 min ago'},
  {name: 'CDN', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
];

function statusColor(s: ServiceStatus) {
  return s === 'healthy' ? '#16a34a' : s === 'degraded' ? '#eab308' : '#dc2626';
}

function statusLabel(s: ServiceStatus) {
  return s === 'healthy' ? 'Healthy' : s === 'degraded' ? 'Degraded' : 'Down';
}

export default function ServiceStatusList() {
  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Service Status</h2>
      <div style={{border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden'}}>
        {services.map((service, i) => (
          <div key={service.name} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{width: 10, height: 10, borderRadius: '50%', background: statusColor(service.status), display: 'inline-block'}}
                role="img"
                aria-label={statusLabel(service.status)}
              />
              <span style={{fontWeight: 500}}>{service.name}</span>
            </div>
            <span style={{fontSize: 13, color: '#666'}}>Checked {service.lastChecked}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
