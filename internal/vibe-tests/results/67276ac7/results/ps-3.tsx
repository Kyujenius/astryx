// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

export default function AdminPanel() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = ['Dashboard', 'Users', 'Settings'];

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <aside className="w-64 border-r p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-4">Admin</h2>
          <Separator />
          <nav className="space-y-1 mt-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setPage(item.toLowerCase())}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${page === item.toLowerCase() ? 'bg-accent font-medium' : 'hover:bg-accent/50'}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
      )}
      <div className="flex-1 flex flex-col">
        <header className="border-b px-6 py-3 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? 'Hide' : 'Show'} Sidebar
          </Button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-6">
            <Card>
              <CardHeader><CardTitle>{page.charAt(0).toUpperCase() + page.slice(1)}</CardTitle></CardHeader>
              <CardContent><p>Content for the {page} section.</p></CardContent>
            </Card>
          </main>
          <aside className="w-72 border-l p-4">
            <h3 className="font-semibold mb-2">Details</h3>
            <p className="text-sm text-muted-foreground">Select an item to view details.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
