import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState, useEffect} from "react";

export default function DarkModeApp() {
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors"><div className="max-w-2xl mx-auto"><div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-bold">My App</h1><Button variant="outline" onClick={() => setDark(!dark)}>{dark ? "Light Mode" : "Dark Mode"}</Button></div><Card><CardHeader><CardTitle>Welcome</CardTitle></CardHeader><CardContent><p>Toggle the theme above.</p><p className="text-sm text-muted-foreground mt-2">All components adapt.</p></CardContent></Card></div></div>
  );
}
