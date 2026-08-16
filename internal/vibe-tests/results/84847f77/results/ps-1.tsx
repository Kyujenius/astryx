import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  const [name, setName] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);

  const navItems = ['General', 'Notifications', 'Security', 'Billing'];

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4">
        <h2 className="font-bold text-lg mb-4">Settings</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setSection(item.toLowerCase())}
              className={`block w-full text-left px-3 py-2 rounded text-sm ${section === item.toLowerCase() ? 'bg-accent font-medium' : 'hover:bg-accent/50'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {section === 'general' && (
          <Card><CardHeader><CardTitle>General</CardTitle></CardHeader><CardContent className="space-y-4">
            <div><Label>Display name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></div>
            <Button>Save changes</Button>
          </CardContent></Card>
        )}
        {section === 'notifications' && (
          <Card><CardHeader><CardTitle>Notifications</CardTitle></CardHeader><CardContent>
            <div className="flex items-center gap-2"><Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} /><Label>Email notifications</Label></div>
          </CardContent></Card>
        )}
        {section === 'security' && (
          <Card><CardHeader><CardTitle>Security</CardTitle></CardHeader><CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Manage your password and 2FA.</p>
            <Button variant="outline">Change password</Button>
          </CardContent></Card>
        )}
        {section === 'billing' && (
          <Card><CardHeader><CardTitle>Billing</CardTitle></CardHeader><CardContent>
            <p className="text-sm text-muted-foreground">View invoices and manage subscription.</p>
          </CardContent></Card>
        )}
      </main>
    </div>
  );
}
