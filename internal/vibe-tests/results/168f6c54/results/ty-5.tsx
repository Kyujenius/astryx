// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function HeroSection() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '80px 32px', textAlign: 'center'}}>
      <h1 style={{margin: 0, fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em'}}>
        Build faster with Astryx
      </h1>
      <p style={{margin: 0, fontSize: 20, color: '#6b7280', maxWidth: 560, lineHeight: 1.6}}>
        A modern design system that helps you ship beautiful, accessible
        interfaces in record time. Focus on what matters.
      </p>
      <button style={{padding: '14px 28px', borderRadius: 8, background: '#2563eb', color: 'white', border: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer'}}>
        Get Started
      </button>
    </div>
  );
}
