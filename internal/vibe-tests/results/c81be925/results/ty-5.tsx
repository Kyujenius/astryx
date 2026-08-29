import {Button} from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <h1 className="text-5xl font-bold tracking-tight">Build faster with Astryx</h1>
      <p className="text-xl text-muted-foreground max-w-lg">A design system built for speed, accessibility, and consistency. Ship beautiful interfaces without starting from scratch.</p>
      <Button size="lg">Get Started</Button>
    </div>
  );
}
