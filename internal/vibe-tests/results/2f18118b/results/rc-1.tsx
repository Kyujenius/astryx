import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";

export default function ResponsiveNav() {
  const links = ["Home", "About", "Services", "Contact"];
  return (
    <nav className="border-b"><div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"><span className="text-lg font-bold">Logo</span><div className="hidden md:flex gap-2">{links.map(l => <Button key={l} variant="ghost">{l}</Button>)}</div><Sheet><SheetTrigger asChild className="md:hidden"><Button variant="ghost" size="icon"><Menu className="h-5 w-5" /><span className="sr-only">Menu</span></Button></SheetTrigger><SheetContent side="left"><div className="flex flex-col gap-2 mt-8">{links.map(l => <Button key={l} variant="ghost" className="justify-start">{l}</Button>)}</div></SheetContent></Sheet></div></nav>
  );
}
