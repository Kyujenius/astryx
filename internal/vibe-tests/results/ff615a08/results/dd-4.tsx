import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../components/ui/tabs';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';

export default function UserProfile() {
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Jane Doe</h1>
        <p className="text-muted-foreground">Software Engineer</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <CardHeader className="p-0"><CardTitle>About</CardTitle></CardHeader>
              <p>Full-stack developer with 5 years of experience.</p>
              <CardHeader className="p-0"><CardTitle>Contact</CardTitle></CardHeader>
              <p>jane.doe@example.com</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <CardHeader className="p-0"><CardTitle>Recent Activity</CardTitle></CardHeader>
              <div className="border-l-2 pl-4 space-y-1">
                <p>Pushed 3 commits to main</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-2 pl-4 space-y-1">
                <p>Opened PR #142</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <CardHeader className="p-0"><CardTitle>Preferences</CardTitle></CardHeader>
              <p>Email notifications: On</p>
              <p>Theme: System default</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
