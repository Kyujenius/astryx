import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <Text weight="bold" size="lg">Brand</Text>
        <div className="hidden md:flex gap-2">
          {navItems.map(item => (
            <Button key={item} variant="ghost" size="sm">{item}</Button>
          ))}
        </div>
        <div className="md:hidden">
          <IconButton icon="menu" label="Open menu" variant="ghost" onPress={() => setOpen(!open)} />
        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-3">
          {navItems.map(item => (
            <Button key={item} variant="ghost" size="sm">{item}</Button>
          ))}
        </div>
      )}
    </nav>
  );
}
