// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState, useEffect} from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="max-w-sm mx-auto p-8">
      <Card>
        <CardHeader><CardTitle>Theme Settings</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>Current: {dark ? 'Dark' : 'Light'} mode</p>
          <Button variant="outline" onClick={() => setDark(!dark)}>
            {dark ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
