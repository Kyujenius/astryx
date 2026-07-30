import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function ThemedCard() {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Custom Card Theme</h2>
      <p className="text-muted-foreground">
        In shadcn/ui, customize card appearance with Tailwind utility classes or CSS variables.
        For a gradient border, use a wrapper div with gradient background and padding.
      </p>
      <div className="p-[2px] rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600">
        <Card className="rounded-[14px]">
          <CardHeader><CardTitle>Gradient Border Card</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Gradient border via wrapper with padding.</p></CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Rounded Card</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Increased border radius via utility class.</p></CardContent>
      </Card>
    </div>
  );
}
