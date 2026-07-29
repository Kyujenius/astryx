import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function CustomThemedCard() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <Card className="border-2 rounded-2xl overflow-hidden" style={{borderImage: 'linear-gradient(135deg, #667eea, #764ba2) 1'}}>
        <CardHeader className="p-6">
          <CardTitle>Gradient Border Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card uses a gradient border and increased border-radius via CSS custom properties.</p>
        </CardContent>
      </Card>

      <Card className="border-2 rounded-2xl overflow-hidden" style={{borderImage: 'linear-gradient(135deg, #667eea, #764ba2) 1'}}>
        <CardHeader className="p-6">
          <CardTitle>Another Themed Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Both cards share the same custom appearance.</p>
        </CardContent>
      </Card>
    </div>
  );
}
