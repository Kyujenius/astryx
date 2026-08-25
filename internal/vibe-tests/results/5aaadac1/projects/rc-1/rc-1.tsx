import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const navItems = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-bold text-lg">MyApp</span>
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm hover:underline">{item.label}</a>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">\u2630</Button>
            </SheetTrigger>
            <SheetContent side="left">
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
