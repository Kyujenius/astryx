export default function MetricsDashboard() {
  const metrics = [
    {label: 'Total Revenue', value: '$128,430', trend: '+14.2%', positive: true},
    {label: 'Active Users', value: '8,942', trend: '+7.1%', positive: true},
    {label: 'Bounce Rate', value: '24.3%', trend: '-3.8%', positive: true},
    {label: 'Avg Session', value: '4m 32s', trend: '-1.2%', positive: false},
  ];

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, padding: 16, fontFamily: 'system-ui'}}>
      {metrics.map((metric) => (
        <div key={metric.label} style={{padding: 20, border: '1px solid #e5e7eb', borderRadius: 12}}>
          <p style={{margin: '0 0 4px', fontSize: 14, color: '#6b7280'}}>{metric.label}</p>
          <p style={{margin: '0 0 4px', fontSize: 28, fontWeight: 'bold', fontVariantNumeric: 'tabular-nums'}}>{metric.value}</p>
          <p style={{margin: 0, fontSize: 13, color: metric.positive ? '#16a34a' : '#dc2626'}}>
            {metric.trend} vs last month
          </p>
        </div>
      ))}
    </div>
  );
}
