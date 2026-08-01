import * as React from 'react';
import {Button} from '../components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '../components/ui/sheet';
import {Menu} from 'lucide-react';

const links = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  return (
    <nav className="border-b">
      <div className="flex h-14 items-center justify-between px-4">
        <span className="text-lg font-semibold">Acme App</span>
        <div className="hidden md:flex gap-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
