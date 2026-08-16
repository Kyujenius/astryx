import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

const navLinks = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between flex-wrap px-6 py-3">
      <Text type="label">MyApp</Text>
      <Button
        label="Menu"
        variant="ghost"
        isIconOnly
        icon={
          <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        }
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto gap-2 pt-3 md:pt-0`} role="menu">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="no-underline text-inherit py-2 px-3 rounded hover:bg-gray-100">
            <Text>{link.label}</Text>
          </a>
        ))}
      </div>
    </nav>
  );
}
