import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

export default function ResponsiveNavigation() {
  const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Products', href: '/products'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
  ];

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg">MyApp</span>

        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="text-lg">{item.label}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
