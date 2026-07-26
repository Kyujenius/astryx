// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export default function ThemedSection() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold">Regular section</h2>
        <p className="text-muted-foreground">Default light theme content.</p>
      </section>
      <section className="bg-slate-900 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold">Featured content</h2>
        <p className="text-slate-300">Dark section for visual emphasis.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader><CardTitle className="text-white">Premium</CardTitle></CardHeader>
            <CardContent><p className="text-slate-300 mb-4">Best for teams</p><Button>Upgrade</Button></CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader><CardTitle className="text-white">Enterprise</CardTitle></CardHeader>
            <CardContent><p className="text-slate-300 mb-4">Custom solutions</p><Button variant="outline">Contact</Button></CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
