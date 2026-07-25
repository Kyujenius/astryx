// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {useState} from 'react';

const LINKS = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  return (
    <div>
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <span className="text-xl font-bold">Brand</span>
        <nav className="hidden md:flex gap-4">
          {LINKS.map((l) => <a key={l} href="#" className="text-sm hover:underline">{l}</a>)}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon">☰</Button></SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-2 mt-8">
                {LINKS.map((l) => <a key={l} href="#" className="text-lg py-2">{l}</a>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="mt-2 text-muted-foreground">Navigation collapses to hamburger on mobile.</p>
      </main>
    </div>
  );
}
