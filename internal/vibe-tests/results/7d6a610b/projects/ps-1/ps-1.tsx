import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

const navItems = [
  {section: 'Account', items: ['Profile', 'Security', 'Notifications']},
  {section: 'Preferences', items: ['Appearance', 'Language', 'Accessibility']},
];

export default function SettingsDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3">
        <h1 className="text-lg font-bold">Settings Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-60 border-r p-4">
          {navItems.map(group => (
            <div key={group.section} className="mb-4">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">{group.section}</h3>
              <div className="flex flex-col gap-1">
                {group.items.map(item => (
                  <Button key={item} variant="ghost" className="justify-start">{item}</Button>
                ))}
              </div>
            </div>
          ))}
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          <Card>
            <CardContent className="p-4">
              <p className="font-medium">Display Name</p>
              <p className="text-sm text-muted-foreground">Configure how your name appears across the app.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
