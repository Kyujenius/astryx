import {useState} from 'react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'activity', 'settings'];

  return (
    <div style={{padding: 24}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24}}>
        <div style={{width: 48, height: 48, borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>JD</div>
        <div>
          <h2 style={{margin: 0, fontSize: 20}}>Jane Doe</h2>
          <p style={{margin: 0, color: '#666', fontSize: 14}}>Software Engineer</p>
        </div>
      </div>
      <div style={{display: 'flex', gap: 0, borderBottom: '1px solid #e0e0e0', marginBottom: 16}} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            style={{padding: '8px 16px', border: 'none', borderBottom: activeTab === tab ? '2px solid #1976d2' : '2px solid transparent', background: 'none', cursor: 'pointer', fontWeight: activeTab === tab ? 'bold' : 'normal', textTransform: 'capitalize'}}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 'overview' && (
        <div>
          <h3 style={{fontSize: 16}}>About</h3>
          <p style={{color: '#666'}}>Full-stack engineer focused on design systems.</p>
          <h3 style={{fontSize: 16}}>Skills</h3>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
            {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((s) => (
              <span key={s} style={{padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: 4, fontSize: 12}}>{s}</span>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'activity' && (
        <div>
          <p>Merged PR: Fix button hover states</p>
          <p>Created issue: Dark mode contrast</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div>
          <p>Email: jane.doe@example.com</p>
          <p>Timezone: America/Los_Angeles</p>
        </div>
      )}
    </div>
  );
}
