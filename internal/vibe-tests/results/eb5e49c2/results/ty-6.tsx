import {useState} from 'react';

export default function InstallationExample() {
  const [copied, setCopied] = useState(false);
  const code = 'yarn add @astryxdesign/core';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <p style={{fontSize: 14, fontWeight: 500, margin: 0}}>Installation</p>
      <div style={{position: 'relative', background: '#1e1e1e', borderRadius: 6, padding: '12px 16px'}}>
        <code style={{color: '#d4d4d4', fontFamily: 'monospace', fontSize: 14}}>{code}</code>
        <button
          onClick={handleCopy}
          style={{position: 'absolute', top: 8, right: 8, background: 'transparent', border: '1px solid #555', borderRadius: 4, color: '#ccc', padding: '4px 8px', cursor: 'pointer', fontSize: 12}}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
