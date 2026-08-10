// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 py-20 px-8 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Build faster with Astryx
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        A modern design system that helps you ship beautiful, accessible
        interfaces in record time. Focus on what matters.
      </p>
      <Button size="lg">Get Started</Button>
    </div>
  );
}
