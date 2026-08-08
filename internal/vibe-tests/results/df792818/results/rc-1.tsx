// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

const NAV_ITEMS = ['Home', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [current, setCurrent] = useState('Home');

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <span className="text-lg font-bold">MyApp</span>
        <div className="hidden md:flex items-center gap-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => setCurrent(item)}
              className={`text-sm ${current === item ? 'font-semibold' : 'text-muted-foreground'}`}
            >
              {item}
            </button>
          ))}
          <Button size="sm">Sign in</Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item}
                    onClick={() => setCurrent(item)}
                    className={`text-left text-lg ${current === item ? 'font-semibold' : ''}`}
                  >
                    {item}
                  </button>
                ))}
                <Button className="mt-4">Sign in</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
