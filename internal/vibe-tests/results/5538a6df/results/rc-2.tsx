// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

const navItems = ['Dashboard', 'Projects', 'Analytics', 'Settings', 'Help'];

export default function ResponsiveSidebar() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[280px] border-r max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:border-r-0 max-md:border-t max-md:max-h-[40vh] max-md:z-50 max-md:bg-background">
        <div className="flex flex-col gap-1 p-4">
          <h3 className="text-sm font-semibold mb-2">Navigation</h3>
          <Separator className="mb-2" />
          {navItems.map(item => (
            <Button key={item} variant="ghost" className="w-full justify-start">{item}</Button>
          ))}
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-3">Main Content</h2>
        <p className="text-muted-foreground">This sidebar becomes a bottom sheet on mobile viewports.</p>
      </main>
    </div>
  );
}
