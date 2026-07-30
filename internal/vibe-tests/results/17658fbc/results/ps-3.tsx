import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {Home, Users, Settings, BarChart3, ChevronLeft, ChevronRight} from 'lucide-react';

const NAV_ITEMS = [
  {id: 'dashboard', label: 'Dashboard', icon: Home},
  {id: 'users', label: 'Users', icon: Users},
  {id: 'settings', label: 'Settings', icon: Settings},
  {id: 'reports', label: 'Reports', icon: BarChart3},
];

export default function AdminPanel() {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-10 flex items-center px-4">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </header>
      <aside className={cn("fixed left-0 top-14 bottom-0 border-r bg-muted/40 transition-all", collapsed ? "w-16" : "w-60")}>
        <nav className="p-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Button key={item.id} variant={active === item.id ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item.id)}>
              <item.icon className="h-4 w-4 mr-2" /> {!collapsed && item.label}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="sm" className="absolute bottom-2 right-2" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </aside>
      <main className={cn("flex-1 pt-14 transition-all", collapsed ? "ml-16" : "ml-60", "mr-80")}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 capitalize">{active}</h2>
          <p>Main content area</p>
        </div>
      </main>
      <aside className="fixed right-0 top-14 bottom-0 w-80 border-l p-4">
        <Card><CardHeader><CardTitle>Details</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Select an item to see details.</p></CardContent></Card>
      </aside>
    </div>
  );
}
