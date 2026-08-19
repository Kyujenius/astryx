import {useState} from 'react';

const presets = [{label: 'Today', days: 0}, {label: 'Tomorrow', days: 1}, {label: 'Next week', days: 7}];

export default function DeadlinePicker() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [isOpen, setIsOpen] = useState(false);

  const handlePreset = (days: number) => {
    const d = new Date(); d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button onClick={() => setIsOpen(!isOpen)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', background: 'white'}}>
        {date ? `Due: ${date}` : 'Set deadline'}
      </button>
      {isOpen && (
        <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 4, padding: 16, border: '1px solid #ccc', borderRadius: 8, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: 280}}>
          <p style={{margin: '0 0 8px', fontWeight: 600}}>Quick presets</p>
          <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
            {presets.map((p) => (<button key={p.label} onClick={() => handlePreset(p.days)} style={{padding: '4px 12px', border: '1px solid #ddd', borderRadius: 4, background: '#f9f9f9', cursor: 'pointer'}}>{p.label}</button>))}
          </div>
          <div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div>
          <div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Time</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div>
          <div style={{display: 'flex', gap: 8}}>
            <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', background: '#0066ff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Apply</button>
            <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', background: 'white'}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
