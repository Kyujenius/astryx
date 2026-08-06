import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Divider} from '@astryxdesign/core/Divider';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const styles = stylex.create({
  container: { display: 'flex', minHeight: '100vh' },
  sidebar: { width: 280, borderRight: '1px solid var(--color-border-default)' },
  main: { flex: 1, padding: 24 },
  hidden: { display: 'none' },
});

const navItems = ['Dashboard', 'Profile', 'Settings', 'Notifications', 'Help'];

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState('Dashboard');

  return (
    <div {...stylex.props(styles.container)}>
      <aside {...stylex.props(styles.sidebar, !isOpen && styles.hidden)}>
        <Stack gap={1} padding={3}>
          <Stack direction="row" justify="space-between" align="center">
            <Text variant="headingSm">Navigation</Text>
            <IconButton label="Close" icon="close" variant="ghost" size="sm" onClick={() => setIsOpen(false)} />
          </Stack>
          <Divider />
          {navItems.map(item => <Button key={item} label={item} variant={active === item ? 'secondary' : 'ghost'} onClick={() => setActive(item)} />)}
        </Stack>
      </aside>
      <main {...stylex.props(styles.main)}>
        <Stack gap={2}>
          {!isOpen && <Button label="Menu" variant="ghost" onClick={() => setIsOpen(true)} />}
          <Text variant="headingLg">{active}</Text>
          <Text variant="bodyMd">Content for {active} goes here.</Text>
        </Stack>
      </main>
    </div>
  );
}