import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from './components/ui/card';
import {Input} from './components/ui/input';
import {Label} from './components/ui/label';
import {Switch} from './components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './components/ui/select';
import {Separator} from './components/ui/separator';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle><CardDescription>Manage your personal information.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="name">Display name</Label><Input id="name" placeholder="Your name" /></div>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@example.com" /></div>
        </CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle><CardDescription>Customize how the app looks.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label htmlFor="dark-mode">Dark mode</Label><Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} /></div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem><SelectItem value="fr">French</SelectItem></SelectContent></Select>
          </div>
        </CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Choose how you want to be notified.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label htmlFor="email-n">Email notifications</Label><Switch id="email-n" checked={emailNotifs} onCheckedChange={setEmailNotifs} /></div>
          <div className="flex items-center justify-between"><Label htmlFor="push-n">Push notifications</Label><Switch id="push-n" checked={pushNotifs} onCheckedChange={setPushNotifs} /></div>
        </CardContent>
      </Card>
    </div>
  );
}
