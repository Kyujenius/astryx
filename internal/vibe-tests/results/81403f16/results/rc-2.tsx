import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from '@/components/ui/sheet';

function SidebarContent() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Filters</h3>
      {['All Items', 'Active', 'Archived', 'Starred'].map(label => <Button key={label} variant="ghost" className="w-full justify-start">{label}</Button>)}
      <p className="text-sm text-muted-foreground">4 categories</p>
    </div>
  );
}

export default function ResponsiveSidebar() {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:block w-64 border-r p-4"><SidebarContent /></aside>
      <main className="flex-1 p-6">
        <div className="md:hidden mb-4"><Sheet><SheetTrigger asChild><Button variant="outline">Filters</Button></SheetTrigger><SheetContent side="bottom"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader><SidebarContent /></SheetContent></Sheet></div>
        <h1 className="text-2xl font-bold">Content Area</h1>
        <p className="mt-2 text-muted-foreground">Main content goes here.</p>
        <Card className="mt-4"><CardContent className="pt-4"><p>Example content card.</p></CardContent></Card>
      </main>
    </div>
  );
}
