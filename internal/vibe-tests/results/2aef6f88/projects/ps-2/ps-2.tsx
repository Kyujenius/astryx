import {ThemeProvider} from '@/components/ui/theme-provider';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const NAV_ITEMS = ['Dashboard', 'Users', 'Reports', 'Settings'];

function Sidebar() {
  return (
    <aside className="w-64 border-r h-full p-4 space-y-1">
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item}
          className={cn(
            'w-full text-left px-3 py-2 rounded-md text-sm',
            i === 0 ? 'bg-accent font-medium' : 'hover:bg-muted'
          )}
        >
          {item}
        </button>
      ))}
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-14 border-b flex items-center px-4">
      <h1 className="text-lg font-semibold">Internal Tool</h1>
    </header>
  );
}

function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to the internal tool.</p>
        </main>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AppLayout />
    </ThemeProvider>
  );
}
