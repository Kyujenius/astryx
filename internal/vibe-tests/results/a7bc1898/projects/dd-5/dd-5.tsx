import {useState} from 'react';

interface Email {
  id: string;
  sender: string;
  subject: string;
  date: string;
  preview: string;
}

const emails: Email[] = [
  {id: '1', sender: 'Alice Johnson', subject: 'Q3 Report Ready', date: '2026-08-17', preview: 'Hi team, the Q3 report is now available...'},
  {id: '2', sender: 'Bob Smith', subject: 'Meeting Tomorrow', date: '2026-08-16', preview: 'Just a reminder about our sync...'},
  {id: '3', sender: 'Carol White', subject: 'Design Review', date: '2026-08-16', preview: 'Attached are the latest mockups...'},
  {id: '4', sender: 'Dave Brown', subject: 'Bug Fix Deployed', date: '2026-08-15', preview: 'The fix has been deployed to prod...'},
  {id: '5', sender: 'Eva Green', subject: 'Welcome aboard!', date: '2026-08-14', preview: 'We are excited to have you join...'},
];

export default function EmailInbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {selected.size > 0 && (
        <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#f0f7ff', borderRadius: 8, marginBottom: 12}}>
          <span style={{fontSize: 14, fontWeight: 500}}>{selected.size} selected</span>
          <button style={{padding: '4px 12px', borderRadius: 4, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 13}}>Archive</button>
          <button style={{padding: '4px 12px', borderRadius: 4, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 13}}>Delete</button>
          <button style={{padding: '4px 12px', borderRadius: 4, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 13}}>Mark as Read</button>
        </div>
      )}
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e5e5e5'}}>
            <th style={{padding: '8px', width: 40}}></th>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>From</th>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>Subject</th>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>Date</th>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {emails.map(email => (
            <tr key={email.id} style={{borderBottom: '1px solid #e5e5e5'}}>
              <td style={{padding: '8px', textAlign: 'center'}}>
                <input
                  type="checkbox"
                  checked={selected.has(email.id)}
                  onChange={() => toggleSelect(email.id)}
                  aria-label={`Select email from ${email.sender}`}
                />
              </td>
              <td style={{padding: '8px 12px', fontWeight: 500}}>{email.sender}</td>
              <td style={{padding: '8px 12px'}}>{email.subject}</td>
              <td style={{padding: '8px 12px', color: '#666'}}>{email.date}</td>
              <td style={{padding: '8px 12px', color: '#888', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{email.preview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
