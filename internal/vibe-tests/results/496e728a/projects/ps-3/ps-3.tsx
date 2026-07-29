import {Button} from '@/components/ui/button';
import {useState} from 'react';

interface AdminPanelProps {
  children?: React.ReactNode;
}

export default function AdminPanel({children}: AdminPanelProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  const navItems = [
    {group: 'Main', items: ['Dashboard', 'Users', 'Content']},
    {group: 'Settings', items: ['General', 'Security']},
  ];

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>Menu</Button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className={`border-r overflow-y-auto transition-all p-4 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden p-0'}`}>
          {navItems.map((section) => (
            <div key={section.group} className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">{section.group}</p>
              {section.items.map((item) => (
                <button
                  key={item}
                  className={`block w-full text-left px-3 py-2 rounded text-sm ${
                    activePage === item.toLowerCase() ? 'bg-accent font-medium' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setActivePage(item.toLowerCase())}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <main className="flex-1 p-6 overflow-y-auto">
          {children ?? <p className="text-muted-foreground">Select a page from the sidebar.</p>}
        </main>
      </div>
    </div>
  );
}
