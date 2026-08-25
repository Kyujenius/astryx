import {useState} from 'react';
import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavItem} from '@astryxdesign/core/TopNav';
import {TopNavHeading} from '@astryxdesign/core/TopNav';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {MobileNavItem} from '@astryxdesign/core/MobileNav';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  desktopNav: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  mobileToggle: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
});

const navItems = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <VStack>
      <div {...stylex.props(styles.desktopNav)}>
        <TopNav
          heading={<TopNavHeading>MyApp</TopNavHeading>}
          startContent={
            <>
              {navItems.map((item) => (
                <TopNavItem key={item.label} label={item.label} href={item.href} />
              ))}
            </>
          }
        />
      </div>
      <div {...stylex.props(styles.mobileToggle)}>
        <Button
          label="Menu"
          variant="ghost"
          onClick={() => setMobileOpen(true)}
          icon={<span aria-hidden>\u2630</span>}
        />
      </div>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
        {navItems.map((item) => (
          <MobileNavItem key={item.label} label={item.label} href={item.href} />
        ))}
      </MobileNav>
    </VStack>
  );
}
