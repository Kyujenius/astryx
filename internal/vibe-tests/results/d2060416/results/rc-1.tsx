import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {IconButton} from '@astryxdesign/core/IconButton';
import {useState} from 'react';

export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Contact'];
  return (
    <nav>
      <HStack justify="space-between" align="center" gap="md">
        <Text size="lg" weight="bold">Logo</Text>
        <HStack gap="sm" className="desktop-nav">{navItems.map(item => (<Button key={item} variant="ghost">{item}</Button>))}</HStack>
        <IconButton label="Toggle menu" icon="menu" variant="ghost" onPress={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn" />
      </HStack>
      {isMenuOpen && (<Stack gap="xs" className="mobile-nav">{navItems.map(item => (<Button key={item} variant="ghost" isFullWidth>{item}</Button>))}</Stack>)}
    </nav>
  );
}
