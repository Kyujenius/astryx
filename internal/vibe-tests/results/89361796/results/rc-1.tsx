import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {MobileNav, MobileNavItem} from '@astryxdesign/core/MobileNav';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  nav: {
    padding: 16,
  },
  desktopLinks: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  hamburger: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
});

const links = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav {...stylex.props(styles.nav)}>
      <HStack justify="between" align="center">
        <Text weight="bold" size="lg">Logo</Text>
        <div {...stylex.props(styles.desktopLinks)}>
          <HStack gap={2}>
            {links.map((link) => (
              <Button key={link} variant="ghost">{link}</Button>
            ))}
          </HStack>
        </div>
        <div {...stylex.props(styles.hamburger)}>
          <Button
            variant="ghost"
            onPress={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </Button>
        </div>
      </HStack>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
        {links.map((link) => (
          <MobileNavItem key={link}>{link}</MobileNavItem>
        ))}
      </MobileNav>
    </nav>
  );
}
