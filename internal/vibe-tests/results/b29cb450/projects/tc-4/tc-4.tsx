// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';

const THEMES = [
  {id: 'default', name: 'Default', desc: 'Clean and minimal', bg: '#ffffff', text: '#1a1a1a', accent: '#0066cc'},
  {id: 'midnight', name: 'Midnight', desc: 'Dark purple ambiance', bg: '#1a0a2e', text: '#e8e0f0', accent: '#9b59b6'},
  {id: 'forest', name: 'Forest', desc: 'Dark green serenity', bg: '#0a1f0a', text: '#d4edda', accent: '#28a745'},
];

export default function ThemeSwitcher() {
  const [active, setActive] = useState('default');

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Theme</h2>
        <p className="text-muted-foreground">Choose a theme for your workspace.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {THEMES.map(theme => (
          <Card key={theme.id}>
            <CardHeader>
              <div className="w-full h-20 rounded-md border" style={{backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: theme.accent, fontWeight: 600}}>Aa</span>
              </div>
              <CardTitle className="mt-2">{theme.name}</CardTitle>
              <CardDescription>{theme.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant={active === theme.id ? 'default' : 'outline'} disabled={active === theme.id} onClick={() => setActive(theme.id)}>
                {active === theme.id ? 'Active' : 'Apply'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
