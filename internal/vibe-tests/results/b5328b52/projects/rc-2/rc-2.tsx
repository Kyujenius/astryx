import {useState} from 'react';
import {Button} from './components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from './components/ui/sheet';

const navItems = [
  {id: 'dashboard', label: 'Dashboard'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'settings', label: 'Settings'},
];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState('dashboard');

  const NavContent = () => (
    <nav className="space-y-1">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`block w-full text-left px-3 py-2 rounded-md text-sm ${active === item.id ? 'bg-accent font-medium' : 'hover:bg-muted'}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 border-r p-4">
        <h2 className="text-lg font-bold mb-4">My App</h2>
        <NavContent />
      </aside>

      {/* Mobile bottom sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="m-4">Menu</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <div className="py-4">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">
          {navItems.find(i => i.id === active)?.label}
        </h1>
        <p className="text-muted-foreground">Content for the {active} section goes here.</p>
      </main>
    </div>
  );
}
