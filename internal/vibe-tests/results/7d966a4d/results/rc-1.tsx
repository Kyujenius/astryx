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
    <nav aria-label="Main navigation" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', flexWrap: 'wrap'}}>
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
      <div style={{display: isOpen ? 'flex' : 'none', flexDirection: 'column', width: '100%', gap: 8, paddingTop: 12}} role="menu">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={{textDecoration: 'none', color: 'inherit', padding: '8px 0'}}>
            <Text>{link.label}</Text>
          </a>
        ))}
      </div>
    </nav>
  );
}
