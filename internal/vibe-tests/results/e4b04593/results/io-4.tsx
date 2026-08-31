import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 29.99;

  const handleChange = (val: number) => {
    setQuantity(Math.min(99, Math.max(1, val)));
  };

  return (
    <Card className="w-[320px]">
      <CardContent className="space-y-4 pt-6">
        <p className="font-medium">Premium Widget</p>
        <p className="text-sm text-muted-foreground">${pricePerItem.toFixed(2)} each</p>
        <div className="space-y-2">
          <Label htmlFor="qty">Quantity</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleChange(quantity - 1)} disabled={quantity <= 1}>-</Button>
            <Input
              id="qty"
              type="number"
              value={quantity}
              onChange={(e) => handleChange(parseInt(e.target.value) || 1)}
              min={1}
              max={99}
              className="w-20 text-center"
            />
            <Button variant="outline" size="icon" onClick={() => handleChange(quantity + 1)} disabled={quantity >= 99}>+</Button>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Total:</span>
          <span className="font-medium">${(quantity * pricePerItem).toFixed(2)}</span>
        </div>
        <Button className="w-full">Add to cart</Button>
      </CardContent>
    </Card>
  );
}
