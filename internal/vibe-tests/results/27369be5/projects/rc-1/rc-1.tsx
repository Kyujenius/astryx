import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <span className="font-bold text-lg">Brand</span>
        <div className="hidden md:flex gap-2">
          {navItems.map(item => (
            <Button key={item} variant="ghost" size="sm">{item}</Button>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">&#9776;</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-2 mt-6">
                {navItems.map(item => (
                  <Button key={item} variant="ghost" className="justify-start">{item}</Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
