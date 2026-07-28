// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

const navItems = ['General', 'Account', 'Notifications', 'Security', 'Integrations'];

export default function SettingsDashboard() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <Button key={item} variant={i === 0 ? 'secondary' : 'ghost'} className="justify-start">{item}</Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">General Settings</h1>
        <div className="grid gap-4">
          <Card>
            <CardHeader><CardTitle>Application</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Manage your application preferences.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Customize colors and layout.</p></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
