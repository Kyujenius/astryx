import {TopNav} from '@astryxdesign/core/TopNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {MobileNavToggle} from '@astryxdesign/core/MobileNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Link} from '@astryxdesign/core/Link';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';

const navItems = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  return (
    <>
      <TopNav
        heading={<Heading level={1}>MyApp</Heading>}
        startContent={
          <HStack gap="md">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </HStack>
        }
        endContent={<MobileNavToggle />}
      />
      <MobileNav>
        <SideNavSection title="Navigation">
          {navItems.map((item) => (
            <SideNavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </SideNavSection>
      </MobileNav>
    </>
  );
}
