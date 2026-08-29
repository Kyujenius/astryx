import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const links = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <a href="/" className="text-lg font-bold">MyApp</a>
        <div className="hidden md:flex gap-4">
          {links.map((l) => (<a key={l.href} href={l.href} className="text-sm hover:text-primary">{l.label}</a>))}
        </div>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Open navigation">&#9776;</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((l) => (<a key={l.href} href={l.href} className="text-lg" onClick={() => setOpen(false)}>{l.label}</a>))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
