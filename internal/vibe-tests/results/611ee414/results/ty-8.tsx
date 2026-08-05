// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function ProfileCard() {
  return (
    <div style={{maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'sans-serif'}}>
      <img src="https://i.pravatar.cc/80?u=profile" alt="Jane Doe" style={{width: 64, height: 64, borderRadius: '50%'}} />
      <div>
        <h3 style={{margin: 0}}>Jane Doe</h3>
        <p style={{margin: '4px 0', fontSize: 14, color: '#666'}}>Senior Software Engineer</p>
        <p style={{margin: '4px 0', fontSize: 14}}>Passionate about building accessible, performant web applications.</p>
        <p style={{margin: '4px 0', fontSize: 12, color: '#999'}}>Joined March 2022</p>
      </div>
    </div>
  );
}