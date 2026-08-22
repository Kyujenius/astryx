const services = [
  {name: 'API Gateway', status: 'healthy', latency: '12ms'},
  {name: 'Auth Service', status: 'healthy', latency: '8ms'},
  {name: 'Database', status: 'degraded', latency: '230ms'},
  {name: 'Cache Layer', status: 'healthy', latency: '2ms'},
  {name: 'Worker Queue', status: 'down', latency: 'N/A'},
];

const statusColors: Record<string, string> = {
  healthy: '#22c55e',
  degraded: '#eab308',
  down: '#ef4444',
};

export default function ServiceStatusList() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      {services.map((service) => (
        <div key={service.name} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: 8}}>
          <span style={{width: 10, height: 10, borderRadius: '50%', background: statusColors[service.status]}} />
          <span style={{fontWeight: 500}}>{service.name}</span>
          <span style={{marginLeft: 'auto', fontSize: 14, color: '#666'}}>{service.latency}</span>
        </div>
      ))}
    </div>
  );
}
