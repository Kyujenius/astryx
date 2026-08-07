import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import {Menu, PanelLeft, X} from 'lucide-react';

const navItems = ['Dashboard', 'Users', 'Settings', 'Reports'];

export default function AdminPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            <PanelLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold">Admin Panel</h1>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className={cn("border-r transition-all", collapsed ? "w-0 overflow-hidden" : "w-56")}>
          <ScrollArea className="h-full p-3">
            <nav className="space-y-1">
              {navItems.map(item => (
                <button key={item} onClick={() => setActive(item)}
                  className={cn("w-full text-left px-3 py-2 rounded text-sm", active === item ? "bg-accent font-medium" : "hover:bg-muted")}>
                  {item}
                </button>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">{active}</h2>
          <p>Main content for {active}</p>
        </main>
        <aside className="w-72 border-l p-4 hidden lg:block">
          <h3 className="font-semibold mb-2">Details</h3>
          <p className="text-sm text-muted-foreground">Select an item to view details.</p>
        </aside>
      </div>
    </div>
  );
}
