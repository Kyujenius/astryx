// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';

type Section = 'general' | 'notifications' | 'security';

export default function SettingsDashboard() {
  const [section, setSection] = useState<Section>('general');

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul className="space-y-1">
          {(['general', 'notifications', 'security'] as Section[]).map(s => (
            <li key={s}><button onClick={() => setSection(s)} className={`w-full text-left px-3 py-2 rounded-md ${section === s ? 'bg-accent' : 'hover:bg-muted'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button></li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
        {section === 'general' && (
          <Card><CardHeader><CardTitle>Profile</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue="John Doe" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" type="email" /></div>
            <Button>Save</Button>
          </CardContent></Card>
        )}
        {section === 'notifications' && (
          <Card><CardHeader><CardTitle>Notifications</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><Label>Email notifications</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>Push notifications</Label><Switch /></div>
          </CardContent></Card>
        )}
      </main>
    </div>
  );
}
