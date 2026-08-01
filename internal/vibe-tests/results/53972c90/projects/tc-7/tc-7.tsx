import * as React from 'react';
import {Card, CardContent} from '../components/ui/card';

const navItems = ['Dashboard', 'Projects', 'Teams', 'Settings'];

export default function ThemedLayout() {
  const [active, setActive] = React.useState('Dashboard');

  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-slate-900 text-slate-100 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Navigation</h2>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActive(item)}
                className={`w-full text-left rounded-md px-3 py-2 text-sm ${
                  active === item ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 bg-white p-6">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-4">
          This content area uses the default light theme while the sidebar is dark.
        </p>
        <Card>
          <CardContent className="pt-6">
            <p>Content goes here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
