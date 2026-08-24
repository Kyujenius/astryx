export default function RootLayout({children}: {children?: React.ReactNode}) {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'system-ui'}}>
      <header style={{borderBottom: '1px solid #e5e7eb', padding: '12px 24px'}}>
        <span style={{fontWeight: 700, fontSize: '18px'}}>Internal Tool</span>
      </header>
      <main style={{padding: '24px'}}>
        {children ?? <p>Welcome to the internal tool.</p>}
      </main>
    </div>
  );
}
