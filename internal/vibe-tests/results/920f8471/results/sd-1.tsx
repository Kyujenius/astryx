import {useState, useEffect} from 'react';

interface DashboardData { value: number; label: string; change: number; }

export default function DashboardWidget({fetchData}: {fetchData: () => Promise<DashboardData>}) {
  const [state, setState] = useState<'loading' | 'error' | 'data'>('loading');
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  const load = async () => {
    setState('loading');
    try { const r = await fetchData(); setData(r); setState('data'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Failed'); setState('error'); }
  };

  useEffect(() => { load(); }, []);

  const cardStyle = {width: 320, minHeight: 200, border: '1px solid #e0e0e0', borderRadius: 8, padding: 24};

  return (
    <div style={cardStyle}>
      {state === 'loading' && (
        <div>
          <div style={{height: 24, width: '60%', backgroundColor: '#f0f0f0', borderRadius: 4, marginBottom: 12}} />
          <div style={{height: 48, width: '40%', backgroundColor: '#f0f0f0', borderRadius: 4, marginBottom: 12}} />
          <div style={{height: 16, width: '80%', backgroundColor: '#f0f0f0', borderRadius: 4}} />
        </div>
      )}
      {state === 'error' && (
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#dc2626'}}>Something went wrong</p>
          <p style={{fontSize: 14, color: '#666'}}>{error}</p>
          <button onClick={load} style={{marginTop: 12, padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Retry</button>
        </div>
      )}
      {state === 'data' && data && (
        <div>
          <h3 style={{margin: 0}}>{data.label}</h3>
          <p style={{fontSize: 36, fontWeight: 700, margin: '8px 0'}}>{data.value.toLocaleString()}</p>
          <p style={{color: data.change >= 0 ? '#16a34a' : '#dc2626'}}>
            {data.change >= 0 ? '+' : ''}{data.change}%
          </p>
        </div>
      )}
    </div>
  );
}
