import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const NAV_ITEMS = ['Dashboard', 'Projects', 'Tasks', 'Messages', 'Settings'];

export default function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState('Dashboard');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nav = (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => (
        <button
          key={item}
          className={`w-full text-left px-3 py-2 rounded ${item === active ? 'bg-muted font-medium' : ''}`}
          onClick={() => setActive(item)}
        >{item}</button>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">{active}</h1>
        <p className="mt-2">Content for {active} page.</p>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="fixed bottom-4 right-4">Menu</Button>
          </SheetTrigger>
          <SheetContent side="bottom">{nav}</SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">{nav}</aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{active}</h1>
        <p className="mt-2">Content for {active} page.</p>
      </main>
    </div>
  );
}
