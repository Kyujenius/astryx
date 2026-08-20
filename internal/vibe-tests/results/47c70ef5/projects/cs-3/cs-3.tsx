import {useState} from 'react';

type DeadlinePreset = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(preset: DeadlinePreset): string {
  const now = new Date();
  switch (preset) {
    case 'today': return now.toISOString().split('T')[0];
    case 'tomorrow': { const d = new Date(now); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
    case 'next-week': { const d = new Date(now); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]; }
    default: return '';
  }
}

export default function DeadlinePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [mode, setMode] = useState<DeadlinePreset>('today');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('09:00');

  const handleApply = () => {
    if (mode === 'custom') {
      setDeadline(`${customDate} ${customTime}`);
    } else {
      setDeadline(getPresetDate(mode));
    }
    setIsOpen(false);
  };

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer'}}
      >
        {deadline || 'Set a deadline'}
      </button>
      {isOpen && (
        <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 4, padding: 16, border: '1px solid #ddd', borderRadius: 8, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: 260}}>
          <div style={{display: 'flex', gap: 4, marginBottom: 12}}>
            {(['today', 'tomorrow', 'next-week', 'custom'] as const).map((p) => (
              <button key={p} onClick={() => setMode(p)} style={{padding: '4px 8px', border: mode === p ? '2px solid #0066cc' : '1px solid #ccc', borderRadius: 4, background: mode === p ? '#e6f0ff' : '#fff', cursor: 'pointer', fontSize: 12}}>
                {p === 'next-week' ? 'Next week' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          {mode === 'custom' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12}}>
              <label style={{fontSize: 12}}>
                Date
                <input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} style={{display: 'block', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, width: '100%'}} />
              </label>
              <label style={{fontSize: 12}}>
                Time
                <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} style={{display: 'block', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, width: '100%'}} />
              </label>
            </div>
          )}
          <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
            <button onClick={() => setIsOpen(false)} style={{padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer'}}>Cancel</button>
            <button onClick={handleApply} style={{padding: '6px 12px', border: 'none', background: '#0066cc', color: '#fff', borderRadius: 4, cursor: 'pointer'}}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
