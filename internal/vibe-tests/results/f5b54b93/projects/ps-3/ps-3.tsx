// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {ChevronLeft, ChevronRight, Menu} from 'lucide-react';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b flex items-center px-4 gap-3 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold">Admin Panel</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-60 border-r p-4 space-y-2 shrink-0">
            <nav className="space-y-1">
              {['Dashboard', 'Users', 'Settings', 'Reports'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 rounded-md text-sm hover:bg-muted">{item}</a>
              ))}
            </nav>
          </aside>
        )}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">Main content area.</p>
        </main>
        <aside className="w-72 border-l p-4 shrink-0">
          <h3 className="font-semibold mb-3">Details</h3>
          <p className="text-sm text-muted-foreground">Select an item to view details.</p>
        </aside>
      </div>
    </div>
  );
}
