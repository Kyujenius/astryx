import {useState} from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

export default function UserProfile() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-3 pt-4">
          <h3 className="font-medium">About</h3>
          <p className="text-sm text-muted-foreground">Full-stack engineer focused on design systems.</p>
          <h3 className="font-medium">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((s) => (
              <span key={s} className="px-2 py-1 bg-muted rounded text-xs">{s}</span>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-2 pt-4">
          <p className="text-sm">Merged PR: Fix button hover states</p>
          <p className="text-sm">Created issue: Dark mode contrast</p>
        </TabsContent>
        <TabsContent value="settings" className="space-y-2 pt-4">
          <p className="text-sm">Email: jane.doe@example.com</p>
          <p className="text-sm">Timezone: America/Los_Angeles</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
