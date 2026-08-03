// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const NAV_ITEMS = ['Dashboard', 'Analytics', 'Settings', 'Help'];

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navItems = NAV_ITEMS.map(item => (
    <Button key={item} variant={selected === item ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setSelected(item)}>{item}</Button>
  ));

  if (isMobile) {
    return (
      <div className="min-h-screen">
        <div className="p-4">
          <h2 className="text-2xl font-bold">{selected}</h2>
          <p className="text-muted-foreground mt-2">Content for {selected} goes here.</p>
        </div>
        <Sheet>
          <SheetTrigger asChild><Button className="fixed bottom-4 right-4">Menu</Button></SheetTrigger>
          <SheetContent side="bottom"><div className="space-y-2 py-4">{navItems}</div></SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-60 border-r p-4 space-y-2">{navItems}</aside>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">{selected}</h2>
        <p className="text-muted-foreground mt-2">Content for {selected} goes here.</p>
      </main>
    </div>
  );
}
