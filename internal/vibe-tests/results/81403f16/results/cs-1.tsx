import React, {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Very Ripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');
  return (
    <Card className="w-full max-w-md">
      <CardHeader><CardTitle>Fruit Picker</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fruit">Fruit</Label>
          <Select value={fruit} onValueChange={setFruit}>
            <SelectTrigger id="fruit"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
            <SelectContent>{fruits.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ripeness">Ripeness</Label>
          <Select value={ripeness} onValueChange={setRipeness}>
            <SelectTrigger id="ripeness"><SelectValue placeholder="Select ripeness" /></SelectTrigger>
            <SelectContent>{ripenessLevels.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">Selected: {fruit} - {ripeness}</p>
      </CardContent>
    </Card>
  );
}
