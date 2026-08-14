import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const navItems = [
  {section: 'Account', items: ['Profile', 'Security', 'Notifications']},
  {section: 'Workspace', items: ['General', 'Members', 'Billing']},
];

export default function SettingsDashboard() {
  const [selected, setSelected] = useState('Profile');

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 space-y-6">
        <h1 className="text-xl font-bold">Settings</h1>
        {navItems.map((group) => (
          <div key={group.section} className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{group.section}</p>
            {group.items.map((item) => (
              <Button
                key={item}
                variant={selected === item ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelected(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-2">{selected}</h2>
        <p className="text-muted-foreground mb-6">Manage your {selected.toLowerCase()} settings.</p>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Content for {selected} settings.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
