export default function ArticlePage() {
  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '48px 16px' }}>
      <header style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 48, fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>The Future of Design Systems</h1>
        <p style={{ fontSize: 20, color: '#666', marginBottom: 12 }}>
          How component libraries are evolving to meet the needs of modern product teams
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, color: '#888' }}>
          <span>By Jane Smith</span>
          <span>·</span>
          <span>January 20, 2024</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </header>
      <div style={{ lineHeight: 1.7, fontSize: 16 }}>
        <p style={{ marginBottom: 24 }}>
          Design systems have become the backbone of product development at scale.
          They provide the shared language between designers and engineers, ensuring
          consistency across an organization&apos;s digital products.
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 16 }}>The Component Revolution</h2>
        <p style={{ marginBottom: 24 }}>
          Modern design systems go beyond simple style guides. They encode behavior,
          accessibility, and interaction patterns into reusable components that teams
          can compose into complex interfaces without reinventing the wheel.
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 16 }}>Tokens and Theming</h2>
        <p style={{ marginBottom: 24 }}>
          Design tokens represent the atomic values of a design system: colors, spacing,
          typography scales, and motion curves. By abstracting these decisions into tokens,
          teams can rebrand or support multiple themes without touching component code.
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 16 }}>Looking Ahead</h2>
        <p>
          The next frontier is AI-assisted composition. Tools that understand component
          APIs can generate production-ready code from natural language descriptions,
          accelerating development while maintaining design fidelity.
        </p>
      </div>
    </article>
  );
}
