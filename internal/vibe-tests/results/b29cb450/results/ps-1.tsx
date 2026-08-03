// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

const NAV_ITEMS = ['General', 'Notifications', 'Privacy', 'Appearance', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-56 border-r p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <Button key={item} variant={active === item ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item)}>{item}</Button>
          ))}
        </aside>
        <main className="flex-1 p-6 space-y-6">
          <h2 className="text-xl font-semibold">{active}</h2>
          <section className="space-y-2">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-muted-foreground text-sm">Manage your profile information.</p>
            <Separator />
          </section>
          <section className="space-y-2">
            <h3 className="text-lg font-medium">Account</h3>
            <p className="text-muted-foreground text-sm">Update account settings.</p>
            <Separator />
          </section>
          <section className="space-y-2">
            <h3 className="text-lg font-medium">Preferences</h3>
            <p className="text-muted-foreground text-sm">Customize your experience.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
