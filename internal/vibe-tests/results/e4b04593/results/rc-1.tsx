import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const navLinks = ['Home', 'About', 'Products', 'Contact'];

export default function ResponsiveNav() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">Logo</span>
        <div className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <Button key={link} variant="ghost">{link}</Button>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Button key={link} variant="ghost" className="w-full justify-start">{link}</Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
