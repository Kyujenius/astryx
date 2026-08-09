// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function UserProfile() {
  return (
    <div className="max-w-xl p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">Jane Doe</h2>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent>
              <p>Full-stack developer with 5 years of experience.</p>
              <p className="text-sm text-muted-foreground mt-2">Joined January 2022</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <p>Pushed 3 commits to main</p>
              <p>Reviewed PR #142</p>
              <p>Commented on Issue #89</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
            <CardContent><p>Notification preferences and account settings.</p></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
