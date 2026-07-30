import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your personal information.</p>
        <div className="space-y-3">
          <div><Label htmlFor="name">Display name</Label><Input id="name" placeholder="Enter your name" /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" placeholder="you@example.com" /></div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">Control how the interface looks.</p>
        <div className="flex items-center space-x-2">
          <Switch id="dark" checked={darkMode} onCheckedChange={setDarkMode} />
          <Label htmlFor="dark">Dark mode</Label>
        </div>
        <div>
          <Label>Language</Label>
          <Select defaultValue="en">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Choose how to be notified.</p>
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notif" checked={emailNotifs} onCheckedChange={(c) => setEmailNotifs(!!c)} />
          <Label htmlFor="email-notif">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notif" />
          <Label htmlFor="push-notif">Push notifications</Label>
        </div>
      </section>
    </div>
  );
}
