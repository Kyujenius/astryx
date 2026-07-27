import {Input} from "@/components/ui/input";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Card, CardContent} from "@/components/ui/card";
import {useState, useCallback} from "react";

interface Suggestion { id: string; label: string; }
export default function AutocompleteInput() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const onSearch = useCallback(async (value: string) => {
    setQuery(value);
    if (!value.trim()) { setItems([]); return; }
    try { const res = await fetch(`https://api.example.com/search?q=${encodeURIComponent(value)}`); const data = await res.json(); setItems(data.results.map((r: any) => ({id: r.id, label: r.name}))); setOpen(true); } catch { setItems([]); }
  }, []);
  return (
    <Card className="max-w-md mx-auto"><CardContent className="pt-6"><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Input placeholder="Type to search..." value={query} onChange={e => onSearch(e.target.value)} /></PopoverTrigger><PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]"><Command><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup>{items.map(item => (<CommandItem key={item.id} onSelect={() => { setQuery(item.label); setOpen(false); }}>{item.label}</CommandItem>))}</CommandGroup></CommandList></Command></PopoverContent></Popover></CardContent></Card>
  );
}
