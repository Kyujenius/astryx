import {useState} from 'react';
import {Button} from '@/components/ui/button';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-lg font-bold">MyBrand</span>
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 hover:underline">{item}</a>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? '\u2715' : '\u2630'}
        </Button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 hover:bg-accent rounded">{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
