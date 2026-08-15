import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';
import {Button} from './components/ui/button';
import {Input} from './components/ui/input';
import {Label} from './components/ui/label';
import {Switch} from './components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './components/ui/select';
import {Separator} from './components/ui/separator';

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('system');

  const navItems = [
    {id: 'profile', label: 'Profile', group: 'Account'},
    {id: 'security', label: 'Security', group: 'Account'},
    {id: 'notifications', label: 'Notifications', group: 'Preferences'},
    {id: 'appearance', label: 'Appearance', group: 'Preferences'},
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <nav className="space-y-4">
          {['Account', 'Preferences'].map((group) => (
            <div key={group}>
              <p className="text-sm text-muted-foreground font-medium mb-2">{group}</p>
              {navItems.filter(i => i.group === group).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${activeSection === item.id ? 'bg-accent font-medium' : 'hover:bg-muted'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {activeSection === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        )}
        {activeSection === 'notifications' && (
          <Card>
            <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="notif">Email notifications</Label>
                <Switch id="notif" checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        )}
        {activeSection === 'appearance' && (
          <Card>
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
        {activeSection === 'security' && (
          <Card>
            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <p className="text-muted-foreground">Manage your password and two-factor authentication settings.</p>
              <Button variant="outline">Change password</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
