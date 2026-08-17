import {useState} from 'react';
import {Button} from '@/components/ui/button';

const navLinks = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-3">
      <span className="font-bold text-lg">MyApp</span>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle menu">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </Button>
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto gap-1 pt-3 md:pt-0`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="px-3 py-2 rounded text-sm hover:bg-accent">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
