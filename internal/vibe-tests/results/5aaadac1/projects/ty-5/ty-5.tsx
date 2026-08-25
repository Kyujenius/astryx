import {Button} from '@/components/ui/button';

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-5xl font-bold tracking-tight">Build faster with Astryx</h1>
        <p className="text-xl text-muted-foreground">
          A modern design system for building consistent, accessible, and beautiful user interfaces at scale.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
}
