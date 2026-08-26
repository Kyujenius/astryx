import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const links = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="p-4 border-b">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Logo</span>
        <div className="hidden md:flex gap-2">
          {links.map((l) => <Button key={l} variant="ghost">{l}</Button>)}
        </div>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" aria-label="Menu">☰</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-2 mt-8">
                {links.map((l) => (
                  <Button key={l} variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                    {l}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
