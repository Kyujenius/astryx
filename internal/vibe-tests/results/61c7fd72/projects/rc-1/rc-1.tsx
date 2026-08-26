import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {MobileNav, MobileNavItem} from '@astryxdesign/core/MobileNav';

const links = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <Text weight="bold" size="lg">Logo</Text>
        <div className="hidden md:flex gap-2">
          {links.map((l) => <Button key={l} variant="ghost">{l}</Button>)}
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onPress={() => setOpen(true)} aria-label="Open menu">☰</Button>
        </div>
      </div>
      <MobileNav isOpen={open} onClose={() => setOpen(false)}>
        {links.map((l) => <MobileNavItem key={l}>{l}</MobileNavItem>)}
      </MobileNav>
    </nav>
  );
}
