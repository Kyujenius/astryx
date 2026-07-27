import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'Contact'];
  return (
    <nav className="bg-white shadow"><div className="max-w-6xl mx-auto px-4"><div className="flex justify-between items-center h-16"><Text size="lg" weight="bold">Logo</Text><div className="hidden md:flex gap-2">{links.map(l => <Button key={l} variant="ghost">{l}</Button>)}</div><div className="md:hidden"><IconButton label="Menu" icon="menu" variant="ghost" onPress={() => setOpen(!open)} /></div></div></div>{open && (<div className="md:hidden border-t px-4 py-2 space-y-1">{links.map(l => <Button key={l} variant="ghost" isFullWidth>{l}</Button>)}</div>)}</nav>
  );
}
