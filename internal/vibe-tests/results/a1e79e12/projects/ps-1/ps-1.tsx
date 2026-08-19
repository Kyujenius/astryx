import {useState} from 'react';
import {Button} from './components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';

const navItems = ['General', 'Security', 'Notifications', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button key={item} variant={active === item ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item)}>
              {item}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Card>
          <CardHeader><CardTitle>{active}</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Settings content for {active} section.</p></CardContent>
        </Card>
      </main>
    </div>
  );
}
