// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Heading} from '@astryxdesign/core/Heading';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <Heading level={4}>Brand</Heading>
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Button key={item} label={item} variant="ghost" onPress={() => {}} />
          ))}
        </div>
        <div className="md:hidden">
          <IconButton label="Menu" icon={<MenuIcon />} onPress={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-6 py-2 flex flex-col gap-1 border-t">
          {navItems.map((item) => (
            <Button key={item} label={item} variant="ghost" onPress={() => setIsOpen(false)} />
          ))}
        </div>
      )}
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
  );
}