import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  nav: {
    width: '100%',
  },
  desktopLinks: {
    display: 'flex',
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
  mobileMenu: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
});

const navLinks = ['Home', 'About', 'Products', 'Contact'];

export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <VStack gap={0}>
      <HStack gap={2} padding={2} vAlign="center" hAlign="between" xstyle={styles.nav}>
        <Heading level={4}>Logo</Heading>
        <HStack gap={2} xstyle={styles.desktopLinks}>
          {navLinks.map((link) => (
            <Button key={link} label={link} variant="ghost" />
          ))}
        </HStack>
        <div {...stylex.props(styles.hamburger)}>
          <Button
            label={isMenuOpen ? 'Close menu' : 'Open menu'}
            variant="ghost"
            isIconOnly
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </HStack>
      {isMenuOpen && (
        <VStack gap={1} padding={2} xstyle={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Button key={link} label={link} variant="ghost" width="100%" />
          ))}
        </VStack>
      )}
    </VStack>
  );
}
