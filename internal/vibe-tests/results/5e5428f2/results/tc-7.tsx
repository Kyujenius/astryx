export default function DualThemeLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
        <h4 className="font-semibold text-lg">Navigation</h4>
        <nav className="flex flex-col gap-1">
          <a href="#" className="px-3 py-2 rounded hover:bg-gray-800">Dashboard</a>
          <a href="#" className="px-3 py-2 rounded hover:bg-gray-800">Projects</a>
          <a href="#" className="px-3 py-2 rounded hover:bg-gray-800">Settings</a>
          <a href="#" className="px-3 py-2 rounded hover:bg-gray-800">Help</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p>This content area uses a light theme while the sidebar uses a dark theme.</p>
          <p className="text-muted-foreground">Each section can have its own theme without affecting the rest.</p>
        </div>
      </main>
    </div>
  );
}
