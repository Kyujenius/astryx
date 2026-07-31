import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  nav: {
    padding: '12px 24px',
    borderBottom: '1px solid var(--color-border-default)',
  },
  links: {
    display: 'flex',
    gap: '16px',
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
  mobileMenu: {
    padding: '16px',
    borderBottom: '1px solid var(--color-border-default)',
  },
  link: {
    cursor: 'pointer',
    padding: '8px 12px',
  },
});

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <VStack>
      <div {...stylex.props(styles.nav)}>
        <HStack hAlign="between" vAlign="center">
          <Heading level={4}>MyBrand</Heading>
          <div {...stylex.props(styles.links)}>
            {navItems.map((item) => (
              <Text key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></Text>
            ))}
          </div>
          <div {...stylex.props(styles.hamburger)}>
            <Button
              label={isMenuOpen ? 'Close menu' : 'Open menu'}
              variant="ghost"
              isIconOnly
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={<span>{isMenuOpen ? '\u2715' : '\u2630'}</span>}
            />
          </div>
        </HStack>
      </div>
      {isMenuOpen && (
        <div {...stylex.props(styles.mobileMenu)}>
          <VStack gap={1}>
            {navItems.map((item) => (
              <div key={item} {...stylex.props(styles.link)}>
                <Text><a href={`#${item.toLowerCase()}`}>{item}</a></Text>
              </div>
            ))}
          </VStack>
        </div>
      )}
    </VStack>
  );
}
