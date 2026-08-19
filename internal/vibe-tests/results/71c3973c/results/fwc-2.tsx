import {useState} from 'react';

export default function NotificationBell() {
  const [count, setCount] = useState(3);

  if (count === 0) {
    return (<button onClick={() => setCount(5)} aria-label="Notifications" style={{padding: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20}}>&#128276;</button>);
  }

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button onClick={() => setCount(0)} aria-label={`${count} unread notifications`} style={{padding: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20}}>&#128276;</button>
      <span style={{position: 'absolute', top: 0, right: 0, background: '#e53e3e', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700}}>{count}</span>
    </div>
  );
}
