export default function MetricCard({label = 'Total Revenue', value = '$12,340.56', change = '+12% from last month'}) {
  return (
    <div style={{border: '1px solid #eee', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontFamily: 'system-ui'}}>
      <p style={{fontSize: 12, color: '#666', margin: 0}}>{label}</p>
      <p style={{fontSize: 32, fontWeight: 700, margin: '4px 0'}}>{value}</p>
      <p style={{fontSize: 12, color: '#666', margin: 0}}>{change}</p>
    </div>
  );
}