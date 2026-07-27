import {Theme} from '@astryxdesign/core/Theme';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

export default function DarkModeApp() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  return (<Theme colorScheme={scheme}><div className="min-h-screen p-8"><div className="max-w-2xl mx-auto"><div className="flex justify-between items-center mb-8"><Heading level={1}>My App</Heading><Button onPress={() => setScheme(s => s === 'light' ? 'dark' : 'light')} variant="default">{scheme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button></div><div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"><Heading level={2}>Welcome</Heading><Text>Toggle the theme with the button above.</Text><Text color="secondary">All components adapt automatically.</Text></div></div></div></Theme>);
}
