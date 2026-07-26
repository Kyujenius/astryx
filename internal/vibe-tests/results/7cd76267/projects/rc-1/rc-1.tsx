// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';

const NAV_ITEMS = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="border-b">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <span className="text-xl font-bold">MyApp</span>
          <nav className="hidden md:flex gap-4">
            {NAV_ITEMS.map(item => <a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.label}</a>)}
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {NAV_ITEMS.map(item => <a key={item.href} href={item.href} className="text-lg" onClick={() => setIsOpen(false)}>{item.label}</a>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="p-8"><h1 className="text-3xl font-bold">Welcome</h1></main>
    </div>
  );
}
