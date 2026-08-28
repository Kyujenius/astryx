import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Separator} from '@/components/ui/separator';

type Page = 'general' | 'notifications' | 'security' | 'appearance';

export default function SettingsDashboard() {
  const [page, setPage] = useState<Page>('general');

  const navItems: {key: Page; label: string}[] = [
    {key: 'general', label: 'General'},
    {key: 'notifications', label: 'Notifications'},
    {key: 'security', label: 'Security'},
    {key: 'appearance', label: 'Appearance'},
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Acme App</h1>
      </header>
      <div className="flex flex-1">
        <nav className="w-56 border-r p-4 space-y-1" aria-label="Settings navigation">
          {navItems.map(item => (
            <Button
              key={item.key}
              variant={page === item.key ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <main className="flex-1 p-6">
          {page === 'general' && (
            <Card>
              <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label htmlFor="name">Display Name</Label><Input id="name" defaultValue="Jane Doe" /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" defaultValue="jane@acme.com" /></div>
                <div><Label htmlFor="company">Company</Label><Input id="company" defaultValue="Acme Inc." /></div>
              </CardContent>
            </Card>
          )}
          {page === 'notifications' && (
            <Card>
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label>Email notifications</Label><Switch defaultChecked /></div>
                <Separator />
                <div className="flex items-center justify-between"><Label>Push notifications</Label><Switch defaultChecked /></div>
                <Separator />
                <div className="flex items-center justify-between"><Label>Weekly digest</Label><Switch /></div>
              </CardContent>
            </Card>
          )}
          {page === 'security' && (
            <Card>
              <CardHeader><CardTitle>Security</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Current Password</Label><Input type="password" /></div>
                <div><Label>New Password</Label><Input type="password" /></div>
                <div><Label>Confirm Password</Label><Input type="password" /></div>
              </CardContent>
            </Card>
          )}
          {page === 'appearance' && (
            <Card>
              <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Theme settings for your account.</p>
                <div className="flex items-center justify-between"><Label>Dark mode</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Reduce motion</Label><Switch /></div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
