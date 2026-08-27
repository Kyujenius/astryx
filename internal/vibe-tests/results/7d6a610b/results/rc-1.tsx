import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const links = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold text-lg">MyApp</span>
        <div className="hidden md:flex gap-4">
          {links.map(link => (
            <a key={link} href={`/${link.toLowerCase()}`} className="text-sm hover:underline">{link}</a>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                {links.map(link => (
                  <a key={link} href={`/${link.toLowerCase()}`} className="text-lg">{link}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
