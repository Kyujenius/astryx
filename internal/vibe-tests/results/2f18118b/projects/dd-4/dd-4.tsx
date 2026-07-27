import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function UserProfile() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6"><Avatar className="h-16 w-16"><AvatarImage src="/avatar.jpg" /><AvatarFallback>JD</AvatarFallback></Avatar><div><h1 className="text-2xl font-bold">Jane Doe</h1><p className="text-muted-foreground">Software Engineer</p></div></div>
      <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
        <TabsContent value="overview"><Card><CardHeader><CardTitle>About</CardTitle></CardHeader><CardContent><p>Full-stack engineer focused on design systems.</p><div className="flex gap-8 mt-4"><div className="text-center"><p className="text-2xl font-bold">142</p><p className="text-sm text-muted-foreground">Commits</p></div><div className="text-center"><p className="text-2xl font-bold">28</p><p className="text-sm text-muted-foreground">PRs</p></div></div></CardContent></Card></TabsContent>
        <TabsContent value="activity"><Card><CardContent className="pt-6 space-y-2"><p>Pushed 3 commits</p><p>Opened PR #142</p></CardContent></Card></TabsContent>
        <TabsContent value="settings"><Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Manage preferences.</p></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
