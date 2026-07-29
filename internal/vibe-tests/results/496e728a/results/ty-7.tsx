import {useState} from 'react';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {type: string; items: string[]}[];
  note?: string;
}

export default function Changelog({entries}: {entries: ChangelogEntry[]}) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Changelog</h1>
        <p className="text-muted-foreground mt-1">All notable changes to this project.</p>
      </div>
      <hr />
      {entries.map((entry) => (
        <div key={entry.version} className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {entry.version} <span className="text-muted-foreground font-normal">- {entry.date}</span>
          </h2>
          {entry.changes.map((group) => (
            <div key={group.type}>
              <h3 className="text-lg font-medium capitalize">{group.type}</h3>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                {group.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
          {entry.note && (
            <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground">
              {entry.note}
            </blockquote>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}
