import {Card, CardContent, CardFooter} from './components/ui/card';
import {Button} from './components/ui/button';

const products = [
  {id: 1, title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/headphones/300/200'},
  {id: 2, title: 'Mechanical Keyboard', price: 149.99, image: 'https://picsum.photos/seed/keyboard/300/200'},
  {id: 3, title: 'USB-C Hub', price: 49.99, image: 'https://picsum.photos/seed/hub/300/200'},
  {id: 4, title: 'Monitor Stand', price: 34.99, image: 'https://picsum.photos/seed/stand/300/200'},
  {id: 5, title: 'Webcam HD', price: 89.99, image: 'https://picsum.photos/seed/webcam/300/200'},
  {id: 6, title: 'Mouse Pad XL', price: 24.99, image: 'https://picsum.photos/seed/mousepad/300/200'},
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
          <CardContent className="pt-4">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-xl font-bold mt-1">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
