import { Button } from '@/components/ui/button';

const navItems = ['General', 'Security', 'Notifications', 'Billing', 'API Keys'];

export default function SettingsDashboard() {
  return (
    <div className="flex h-screen">
      <header className="fixed top-0 left-0 right-0 h-14 border-b flex items-center px-6 bg-background z-10">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      <aside className="fixed left-0 top-14 bottom-0 w-56 border-r p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Navigation</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button key={item} variant="ghost" className="w-full justify-start">{item}</Button>
          ))}
        </nav>
      </aside>
      <main className="ml-56 mt-14 p-6 flex-1">
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold">General Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          <div className="space-y-4">
            {[
              { label: 'Display name', desc: 'Your public display name' },
              { label: 'Email', desc: 'user@example.com' },
              { label: 'Language', desc: 'English (US)' },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.desc}</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
