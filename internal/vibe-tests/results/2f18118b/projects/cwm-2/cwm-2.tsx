import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {useState} from "react";

const LABELS = [{name: "bug", color: "#d73a4a", description: "Something isn't working"},{name: "enhancement", color: "#a2eeef", description: "New feature"},{name: "documentation", color: "#0075ca", description: "Docs"},{name: "good first issue", color: "#7057ff", description: "Newcomers"},{name: "help wanted", color: "#008672", description: "Attention needed"}];

export default function IssueLabelPicker() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = LABELS.filter(l => l.name.includes(search.toLowerCase()));
  const toggle = (name: string) => setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  return (
    <Card className="w-80"><CardContent className="p-3"><Input placeholder="Filter labels" value={search} onChange={e => setSearch(e.target.value)} /><div className="mt-3 divide-y">{filtered.map(label => (<div key={label.name} className="flex items-center gap-2 py-2"><Checkbox checked={selected.includes(label.name)} onCheckedChange={() => toggle(label.name)} /><span className="w-3 h-3 rounded-full" style={{backgroundColor: label.color}} /><span className="text-sm font-medium">{label.name}</span><span className="text-xs text-muted-foreground ml-auto">{label.description}</span></div>))}</div>{selected.length > 0 && <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSelected([])}>Clear</Button>}</CardContent></Card>
  );
}
