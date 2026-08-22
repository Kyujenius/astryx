import {Button} from '@/components/ui/button';
import {useState} from 'react';

const sections = [
  {title: 'Account', items: ['Profile', 'Password', 'Email']},
  {title: 'Preferences', items: ['Appearance', 'Notifications', 'Language']},
  {title: 'Billing', items: ['Plan', 'Payment Methods', 'Invoices']},
];

export default function SettingsDashboard() {
  const [active, setActive] = useState('Profile');

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <nav className="flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">{section.title}</p>
              {section.items.map((item) => (
                <Button
                  key={item}
                  variant={active === item ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActive(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">{active}</h1>
        <p className="text-muted-foreground">Configure your {active.toLowerCase()} settings here.</p>
      </main>
    </div>
  );
}
