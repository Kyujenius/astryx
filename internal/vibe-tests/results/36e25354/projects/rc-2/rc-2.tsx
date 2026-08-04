// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const filters = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('All');

  const filterContent = (
    <div className="space-y-2 p-4">
      <h3 className="font-semibold text-lg">Filters</h3>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selected === filter ? 'default' : 'ghost'}
          onClick={() => setSelected(filter)}
          className="w-full justify-start"
        >{filter}</Button>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-64 border-r">
        {filterContent}
      </aside>
      <main className="flex-1 p-6 space-y-4">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Filters</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              {filterContent}
            </SheetContent>
          </Sheet>
        </div>
        <h2 className="text-2xl font-bold">Products: {selected}</h2>
        <p className="text-muted-foreground">Showing items in the {selected} category.</p>
        <Card>
          <CardContent className="p-4">
            <p>Product listing content goes here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
