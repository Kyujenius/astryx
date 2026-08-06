import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {useState} from 'react';

const navItems = ['General', 'Notifications', 'Security', 'Appearance', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');
  return (
    <div className="min-h-screen">
      <header className="border-b p-4"><h1 className="text-xl font-semibold">Settings</h1></header>
      <div className="flex">
        <aside className="w-56 border-r p-4 space-y-1">{navItems.map(item => <Button key={item} variant={active === item ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActive(item)}>{item}</Button>)}</aside>
        <main className="flex-1 p-6 space-y-4"><h2 className="text-2xl font-bold">{active}</h2><Separator /><Card><CardHeader><CardTitle>{active} Settings</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Configure your {active.toLowerCase()} preferences here.</p></CardContent></Card></main>
      </div>
    </div>
  );
}