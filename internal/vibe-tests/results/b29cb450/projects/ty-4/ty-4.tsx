// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';

export default function SettingsPage() {
  const [profile, setProfile] = useState({name: '', email: ''});
  const [notifications, setNotifications] = useState({frequency: ''});
  const [security, setSecurity] = useState({current: '', newPass: ''});

  return (
    <div className="max-w-xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Update your personal information.</p>
        <div className="space-y-3">
          <div><Label htmlFor="name">Display Name</Label><Input id="name" value={profile.name} onChange={e => setProfile(s => ({...s, name: e.target.value}))} /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={profile.email} onChange={e => setProfile(s => ({...s, email: e.target.value}))} /></div>
        </div>
      </section>
      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Control notification frequency.</p>
        <div><Label htmlFor="freq">Email Digest Frequency</Label><Input id="freq" placeholder="daily, weekly" value={notifications.frequency} onChange={e => setNotifications(s => ({...s, frequency: e.target.value}))} /></div>
      </section>
      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Security</h2>
        <p className="text-sm text-muted-foreground">Manage your password.</p>
        <div className="space-y-3">
          <div><Label htmlFor="cur">Current Password</Label><Input id="cur" type="password" value={security.current} onChange={e => setSecurity(s => ({...s, current: e.target.value}))} /></div>
          <div><Label htmlFor="new">New Password</Label><Input id="new" type="password" value={security.newPass} onChange={e => setSecurity(s => ({...s, newPass: e.target.value}))} /></div>
        </div>
      </section>
    </div>
  );
}
