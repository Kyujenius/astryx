import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  nav: {
    padding: '12px 24px',
    borderBottom: '1px solid var(--border-default)',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px 24px',
    borderBottom: '1px solid var(--border-default)',
  },
  desktopLinks: {
    display: 'flex',
    gap: '8px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  hamburger: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
});

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav>
      <div {...stylex.props(styles.nav)}>
        <HStack justify="between" align="center">
          <Text weight="bold" size="lg">Brand</Text>
          <div {...stylex.props(styles.desktopLinks)}>
            {navItems.map(item => (
              <Button key={item} variant="ghost" size="sm">{item}</Button>
            ))}
          </div>
          <div {...stylex.props(styles.hamburger)}>
            <IconButton
              icon="menu"
              label="Open menu"
              variant="ghost"
              onPress={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </HStack>
      </div>
      {mobileOpen && (
        <div {...stylex.props(styles.mobileMenu)}>
          {navItems.map(item => (
            <Button key={item} variant="ghost" size="sm">{item}</Button>
          ))}
        </div>
      )}
    </nav>
  );
}
