import {useState} from 'react';
export default function DarkModeApp() {
  const [dark, setDark] = useState(false);
  const bg = dark ? '#1a1a2e' : '#ffffff';
  const text = dark ? '#e0e0e0' : '#1a1a1a';
  const cardBg = dark ? '#16213e' : '#f8f9fa';
  return (<div style={{minHeight: '100vh', padding: 32, backgroundColor: bg, color: text, transition: 'all 0.3s'}}><div style={{maxWidth: 600, margin: '0 auto'}}><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32}}><h1 style={{fontSize: 28, fontWeight: 700}}>My App</h1><button onClick={() => setDark(!dark)} style={{padding: '8px 16px', border: `1px solid ${dark ? '#444' : '#ccc'}`, borderRadius: 4, backgroundColor: 'transparent', color: text, cursor: 'pointer'}}>{dark ? 'Light Mode' : 'Dark Mode'}</button></div><div style={{backgroundColor: cardBg, borderRadius: 8, padding: 24}}><h2 style={{fontSize: 20, fontWeight: 600}}>Welcome</h2><p style={{marginTop: 8}}>Toggle the theme above.</p><p style={{marginTop: 8, fontSize: 14, color: dark ? '#aaa' : '#666'}}>All elements adapt.</p></div></div></div>);
}
