import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const navItems = ['Dashboard', 'Profile', 'Settings', 'Notifications', 'Help'];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState('Dashboard');
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-64 border-r p-4 space-y-1">{navItems.map(item => <Button key={item} variant={active === item ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item)}>{item}</Button>)}</aside>
      <main className="flex-1 p-6">
        <div className="md:hidden mb-4"><Sheet><SheetTrigger asChild><Button variant="outline">Menu</Button></SheetTrigger><SheetContent side="bottom" className="rounded-t-2xl"><div className="space-y-1 py-4">{navItems.map(item => <Button key={item} variant={active === item ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item)}>{item}</Button>)}</div></SheetContent></Sheet></div>
        <h1 className="text-2xl font-bold">{active}</h1>
        <p className="text-muted-foreground">Content for {active} goes here.</p>
      </main>
    </div>
  );
}