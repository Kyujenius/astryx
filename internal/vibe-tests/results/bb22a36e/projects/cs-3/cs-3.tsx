import {useState} from 'react';

type Preset = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(key: Preset): string {
  const now = new Date();
  switch (key) {
    case 'today': return now.toISOString().slice(0, 10);
    case 'tomorrow': { const d = new Date(now); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); }
    case 'next-week': { const d = new Date(now); d.setDate(d.getDate() + 7); return d.toISOString().slice(0, 10); }
    default: return '';
  }
}

export default function DeadlinePicker() {
  const [preset, setPreset] = useState<Preset | ''>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [confirmed, setConfirmed] = useState(false);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as Preset;
    setPreset(key);
    if (key !== 'custom') { setDate(getPresetDate(key)); }
    setConfirmed(false);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 24, maxWidth: 360, border: '1px solid #ddd', borderRadius: 8}}>
      <label style={{fontWeight: 600}}>Deadline</label>
      <select value={preset} onChange={handlePresetChange} style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}}>
        <option value="">Choose a deadline...</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="next-week">Next week</option>
        <option value="custom">Custom date and time</option>
      </select>
      {preset === 'custom' && (
        <>
          <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setConfirmed(false); }} style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}} />
          <input type="time" value={time} onChange={(e) => { setTime(e.target.value); setConfirmed(false); }} style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}} />
        </>
      )}
      {date && (
        <button onClick={() => setConfirmed(true)} disabled={confirmed} style={{padding: '8px 16px', borderRadius: 4, border: 'none', background: confirmed ? '#ccc' : '#0066cc', color: '#fff', cursor: confirmed ? 'default' : 'pointer'}}>
          {confirmed ? 'Applied' : 'Apply deadline'}
        </button>
      )}
      {confirmed && <p style={{fontSize: 14, color: '#666'}}>Deadline set: {date} at {time}</p>}
    </div>
  );
}
