export default function RootLayout({children}: {children?: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b px-6 py-3">
        <span className="font-bold text-lg">Internal Tool</span>
      </header>
      <main className="p-6">
        {children ?? <p>Welcome to the internal tool.</p>}
      </main>
    </div>
  );
}
