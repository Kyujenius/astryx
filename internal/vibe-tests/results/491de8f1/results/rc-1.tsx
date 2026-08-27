import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavItem} from '@astryxdesign/core/TopNav';
import {MobileNav, MobileNavToggle} from '@astryxdesign/core/MobileNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';

const links = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  return (
    <AppShell
      topNav={
        <TopNav startContent={<span className="font-bold">MyApp</span>}>
          {links.map(link => (
            <TopNavItem key={link} label={link} href={`/${link.toLowerCase()}`} />
          ))}
        </TopNav>
      }
      mobileNav={
        <MobileNav header="MyApp">
          {links.map(link => (
            <SideNavItem key={link} label={link} href={`/${link.toLowerCase()}`} />
          ))}
        </MobileNav>
      }
    >
      <p className="p-4">Page content goes here.</p>
    </AppShell>
  );
}
