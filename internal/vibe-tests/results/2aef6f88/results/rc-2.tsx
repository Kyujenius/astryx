import {useState, useEffect} from 'react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {Menu} from 'lucide-react';
import {cn} from '@/lib/utils';

const NAV_ITEMS = [
  {id: 'home', label: 'Home'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'messages', label: 'Messages'},
  {id: 'settings', label: 'Settings'},
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function NavContent({selected, onSelect}: {selected: string; onSelect: (id: string) => void}) {
  return (
    <nav className="space-y-1 p-2">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
            selected === item.id ? 'bg-accent text-accent-foreground font-medium' : 'hover:bg-muted'
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('home');
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-xl">
          <NavContent selected={selected} onSelect={setSelected} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-64 border-r h-full">
      <NavContent selected={selected} onSelect={setSelected} />
    </aside>
  );
}
