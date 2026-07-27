import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";

export default function ProfileCard() {
  return (
    <Card className="max-w-sm mx-auto text-center"><CardContent className="pt-6"><Avatar className="h-20 w-20 mx-auto"><AvatarImage src="/alex.jpg" /><AvatarFallback>AJ</AvatarFallback></Avatar><h2 className="mt-4 text-xl font-bold">Alex Johnson</h2><Badge className="mt-1">Senior Engineer</Badge><p className="mt-3 text-sm text-muted-foreground">Passionate about accessible design systems. Enjoys hiking and open source.</p></CardContent></Card>
  );
}
