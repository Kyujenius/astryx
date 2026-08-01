import * as React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Switch} from '../components/ui/switch';
import {Label} from '../components/ui/label';

const navItems = ['General', 'Account', 'Notifications', 'Privacy'];

export default function SettingsDashboard() {
  const [page, setPage] = React.useState('General');
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      <div className="flex flex-1">
        <nav className="w-56 border-r p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setPage(item)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm font-medium ${
                    page === item ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">{page}</h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
