import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

const navSections = [
  {title: 'Account', items: ['General', 'Security', 'Notifications']},
  {title: 'App', items: ['Appearance', 'Integrations']},
];

export default function SettingsDashboard() {
  const [activePage, setActivePage] = useState('General');

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Separator />
        {navSections.map(section => (
          <div key={section.title} className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{section.title}</p>
            {section.items.map(item => (
              <Button
                key={item}
                variant={activePage === item ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActivePage(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">{activePage}</h1>
        <p className="mt-2 text-muted-foreground">Configure your {activePage.toLowerCase()} settings here.</p>
      </main>
    </div>
  );
}
