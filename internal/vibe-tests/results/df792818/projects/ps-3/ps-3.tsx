// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';

const NAV_ITEMS = [
  {group: 'Main', items: ['Dashboard', 'Users', 'Settings']},
  {group: 'Reports', items: ['Analytics', 'Logs']},
];

export default function AdminPanel() {
  const [page, setPage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <header className="h-14 border-b flex items-center px-4 shrink-0">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '←' : '→'}
        </Button>
        <span className="ml-3 font-semibold">Admin Panel</span>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-56 border-r overflow-y-auto p-4 space-y-4 shrink-0">
            {NAV_ITEMS.map(group => (
              <div key={group.group}>
                <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">{group.group}</h4>
                <div className="space-y-1">
                  {group.items.map(item => (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`block w-full text-left px-2 py-1.5 rounded text-sm ${page === item ? 'bg-accent font-medium' : 'hover:bg-accent/50'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>
        )}
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold mb-2">{page}</h2>
          <p className="text-muted-foreground">Content for the {page.toLowerCase()} section goes here.</p>
        </main>
        <aside className="w-64 border-l overflow-y-auto p-4 hidden lg:block shrink-0">
          <h3 className="text-sm font-medium mb-3">Details</h3>
          <p className="text-sm text-muted-foreground">Details panel for {page.toLowerCase()}.</p>
        </aside>
      </div>
    </div>
  );
}
