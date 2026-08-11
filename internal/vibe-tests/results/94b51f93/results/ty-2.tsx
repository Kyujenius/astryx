// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function BlogHeader() {
  return (
    <header style={{maxWidth: 640, margin: '0 auto', padding: '32px 16px', fontFamily: 'system-ui'}}>
      <h1 style={{fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: '0 0 12px'}}>The Future of Design Systems</h1>
      <div style={{display: 'flex', gap: 8, fontSize: 14, color: '#666'}}>
        <time>August 11, 2026</time>
        <span>by Jane Smith</span>
      </div>
    </header>
  );
}
