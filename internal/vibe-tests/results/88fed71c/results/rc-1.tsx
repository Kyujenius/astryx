// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-lg font-bold">Brand</span>
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => <Button key={item} variant="ghost">{item}</Button>)}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><MenuIcon /></Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-2 mt-8">
              {navItems.map((item) => <Button key={item} variant="ghost" onClick={() => setIsOpen(false)}>{item}</Button>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" /></svg>);
}