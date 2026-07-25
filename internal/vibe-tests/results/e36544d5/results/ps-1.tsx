// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const NAV_ITEMS = ['General', 'Notifications', 'Privacy', 'Account'];

export default function SettingsDashboard() {
  const [section, setSection] = useState('General');
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-3"><h1 className="text-xl font-bold">My App</h1></header>
      <div className="flex flex-1">
        <nav className="w-56 border-r p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Button key={item} variant={section === item ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setSection(item)}>{item}</Button>
          ))}
        </nav>
        <main className="flex-1 p-6 space-y-4">
          <h2 className="text-2xl font-bold">{section} Settings</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between"><Label>Dark Mode</Label><Switch checked={dark} onCheckedChange={setDark} /></div>
              <div className="flex items-center justify-between"><Label>Notifications</Label><Switch checked={notifs} onCheckedChange={setNotifs} /></div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
