// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';

const navItems = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold">Logo</h1>
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <a key={item} href="#" className="text-sm font-medium hover:text-primary">{item}</a>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <a key={item} href="#" className="text-lg font-medium">{item}</a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
