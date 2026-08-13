import {useState} from 'react';

export default function RowActionsMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e5e7eb'}}>
            <th style={{textAlign: 'left', padding: 12}}>Name</th>
            <th style={{textAlign: 'left', padding: 12}}>Status</th>
            <th style={{textAlign: 'right', padding: 12}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {['Alice', 'Bob', 'Charlie'].map((name) => (
            <tr key={name} style={{borderBottom: '1px solid #f3f4f6'}}>
              <td style={{padding: 12}}>{name}</td>
              <td style={{padding: 12}}>
                <span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, backgroundColor: '#dcfce7', color: '#166534'}}>Active</span>
              </td>
              <td style={{padding: 12, textAlign: 'right', position: 'relative'}}>
                <button
                  onClick={() => setOpenMenu(openMenu === name ? null : name)}
                  style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: '4px 8px'}}
                  aria-label={`Actions for ${name}`}
                >
                  ...
                </button>
                {openMenu === name && (
                  <div style={{position: 'absolute', right: 12, top: 40, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10, minWidth: 140}}>
                    <button onClick={() => { console.log(`Edit ${name}`); setOpenMenu(null); }} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer'}}>Edit</button>
                    <button onClick={() => { console.log(`Duplicate ${name}`); setOpenMenu(null); }} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer'}}>Duplicate</button>
                    <hr style={{margin: '4px 0', border: 'none', borderTop: '1px solid #e5e7eb'}} />
                    <button onClick={() => { console.log(`Delete ${name}`); setOpenMenu(null); }} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626'}}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
