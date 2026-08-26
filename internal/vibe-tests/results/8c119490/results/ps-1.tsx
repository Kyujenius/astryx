import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';

export default function SettingsDashboard() {
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="flex h-screen">
      <aside className="w-56 border-r p-4 space-y-1">
        <h3 className="font-semibold mb-3">Settings</h3>
        <Button variant="ghost" className="w-full justify-start">General</Button>
        <Button variant="ghost" className="w-full justify-start">Account</Button>
        <Button variant="ghost" className="w-full justify-start">Notifications</Button>
        <Button variant="ghost" className="w-full justify-start">Privacy</Button>
      </aside>
      <main className="flex-1">
        <header className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">General Settings</h2>
          <Button>Save Changes</Button>
        </header>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch checked={dark} onCheckedChange={setDark} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">Push notifications</p>
            </div>
            <Switch checked={notifs} onCheckedChange={setNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-save</Label>
              <p className="text-sm text-muted-foreground">Save changes automatically</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
        </div>
      </main>
    </div>
  );
}
