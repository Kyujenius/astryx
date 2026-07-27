import {Theme} from '@astryxdesign/core/Theme';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

export default function DarkModeApp() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  return (
    <Theme colorScheme={colorScheme}><Stack gap="lg" padding="lg">
      <Stack direction="horizontal" justify="space-between" align="center"><Heading level={1}>My App</Heading><Button onPress={() => setColorScheme(prev => prev === 'light' ? 'dark' : 'light')} variant="default">{colorScheme === 'light' ? 'Switch to Dark' : 'Switch to Light'}</Button></Stack>
      <Card><Stack gap="md"><Heading level={2}>Welcome</Heading><Text>This app supports light and dark mode.</Text><Text color="secondary">The theme automatically applies to all child components.</Text></Stack></Card>
    </Stack></Theme>
  );
}
