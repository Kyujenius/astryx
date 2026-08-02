import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

export default function ThemedApp() {
  return (
    <div
      style={{
        '--primary': '239 84% 67%',
        '--primary-foreground': '0 0% 100%',
      } as React.CSSProperties}
    >
      <Card>
        <CardHeader>
          <CardTitle>Brand Theme Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>This page uses a custom brand theme with an indigo accent color.</p>
          <div className="flex gap-2">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary</Button>
            <Badge>Themed Badge</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
