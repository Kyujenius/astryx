import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavItem} from '@astryxdesign/core/TopNav';
import {Heading} from '@astryxdesign/core/Heading';

export default function ResponsiveNav() {
  const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Products', href: '/products'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
  ];

  return (
    <TopNav
      heading={<Heading level={1} size="sm">MyApp</Heading>}
      startContent={
        <>
          {navItems.map(item => (
            <TopNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </>
      }
    />
  );
}
