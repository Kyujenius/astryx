import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b">
        <Heading level={4}>MyBrand</Heading>
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 hover:underline">
              <Text>{item}</Text>
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <Button
            label={isMenuOpen ? 'Close menu' : 'Open menu'}
            variant="ghost"
            isIconOnly
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            icon={<span>{isMenuOpen ? '\u2715' : '\u2630'}</span>}
          />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-1 p-4 border-b">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2">
              <Text>{item}</Text>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
