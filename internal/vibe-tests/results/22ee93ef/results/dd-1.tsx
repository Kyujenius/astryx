// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }
const USERS: User[] = [
  {id:1,name:'Alice Chen',email:'alice@example.com',role:'Admin',status:'Active'},
  {id:2,name:'Bob Smith',email:'bob@example.com',role:'Editor',status:'Active'},
  {id:3,name:'Carol White',email:'carol@example.com',role:'Viewer',status:'Inactive'},
  {id:4,name:'Dan Brown',email:'dan@example.com',role:'Editor',status:'Active'},
  {id:5,name:'Eve Davis',email:'eve@example.com',role:'Admin',status:'Active'},
];
type SortKey = keyof User;

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a,b) => { const av=String(a[sortKey]),bv=String(b[sortKey]); return sortDir==='asc'?av.localeCompare(bv):bv.localeCompare(av); });
  }, [search, sortKey, sortDir]);

  const toggle = (k: SortKey) => { if(k===sortKey) {setSortDir(d=>d==='asc'?'desc':'asc');} else { setSortKey(k); setSortDir('asc'); } };
  const th = {textAlign:'left' as const, padding:'8px 12px', cursor:'pointer', borderBottom:'2px solid #e0e0e0'};

  return (
    <div style={{maxWidth: 700}}>
      <h2 style={{marginBottom: 12}}>Users</h2>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{width:'100%',padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginBottom:12}} aria-label="Search users" />
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr>
          {(['name','email','role','status'] as SortKey[]).map(c=>(
            <th key={c} onClick={()=>toggle(c)} style={th}>{c.charAt(0).toUpperCase()+c.slice(1)}{c===sortKey&&(sortDir==='asc'?' \u2191':' \u2193')}</th>
          ))}
        </tr></thead>
        <tbody>{filtered.map(u=>(
          <tr key={u.id} style={{borderBottom:'1px solid #eee'}}>
            <td style={{padding:'8px 12px'}}>{u.name}</td>
            <td style={{padding:'8px 12px',color:'#666'}}>{u.email}</td>
            <td style={{padding:'8px 12px'}}>{u.role}</td>
            <td style={{padding:'8px 12px',color:u.status==='Active'?'#28a745':'#999'}}>{u.status}</td>
          </tr>
        ))}</tbody>
      </table>
      {filtered.length===0&&<p style={{textAlign:'center',color:'#999',padding:16}}>No users found.</p>}
    </div>
  );
}
