import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";

const sections = ["General", "Account", "Notifications", "Security"];
export default function SettingsDashboard() {
  const [active, setActive] = useState("General");
  return (
    <div className="min-h-screen"><header className="border-b px-6 py-4"><h1 className="text-2xl font-bold">Settings</h1></header><div className="flex"><aside className="w-60 border-r p-4"><nav className="space-y-1">{sections.map(s => (<Button key={s} variant={active === s ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActive(s)}>{s}</Button>))}</nav></aside><main className="flex-1 p-6"><h2 className="text-xl font-semibold">{active}</h2><Separator className="my-4" /><p className="text-muted-foreground">Configure your {active.toLowerCase()} settings.</p><Button className="mt-4">Save Changes</Button></main></div></div>
  );
}
