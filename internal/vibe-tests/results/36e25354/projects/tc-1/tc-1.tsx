// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground p-8 space-y-4 transition-colors">
        <h2 className="text-2xl font-bold">Theme Switcher</h2>
        <p className="text-muted-foreground">Current mode: {isDark ? 'dark' : 'light'}</p>
        <Button onClick={() => setIsDark((d) => !d)}>
          {isDark ? 'Switch to Light' : 'Switch to Dark'}
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Sample Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This content adapts to the current theme mode. Colors, backgrounds, and contrast all switch automatically.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
