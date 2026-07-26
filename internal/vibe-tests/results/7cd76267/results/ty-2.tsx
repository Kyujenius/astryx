// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';

export default function BlogPostHeader() {
  return (
    <header className="max-w-2xl mx-auto py-12 space-y-4">
      <Badge>Design Systems</Badge>
      <h1 className="text-4xl font-bold tracking-tight">The Future of Component Architecture in Modern Web Applications</h1>
      <p className="text-xl text-muted-foreground">How compositional patterns and design tokens reshape UI development at scale.</p>
      <div className="flex items-center gap-3 pt-2">
        <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
        <div><p className="text-sm font-medium">Sarah Chen</p><p className="text-xs text-muted-foreground">July 26, 2026</p></div>
      </div>
    </header>
  );
}
