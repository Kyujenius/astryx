// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Slider} from '@/components/ui/slider';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export default function AppearanceSettings() {
  const [accentColor, setAccentColor] = useState('blue');
  const [borderRadius, setBorderRadius] = useState([8]);
  const [spacingScale, setSpacingScale] = useState([1]);

  return (
    <div className="max-w-lg mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Appearance</h1>
      <p className="text-muted-foreground">Customize how the app looks.</p>

      <Card>
        <CardHeader><CardTitle>Accent Color</CardTitle></CardHeader>
        <CardContent>
          <Select value={accentColor} onValueChange={setAccentColor}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="amber">Amber</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Border Radius</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sharp</span><span>{borderRadius[0]}px</span><span>Rounded</span>
          </div>
          <Slider value={borderRadius} onValueChange={setBorderRadius} min={0} max={24} step={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Spacing Scale</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Compact</span><span>{spacingScale[0]}x</span><span>Spacious</span>
          </div>
          <Slider value={spacingScale} onValueChange={setSpacingScale} min={0.5} max={2} step={0.25} />
        </CardContent>
      </Card>
    </div>
  );
}
