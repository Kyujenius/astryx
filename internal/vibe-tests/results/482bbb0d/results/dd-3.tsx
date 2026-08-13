import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {id: 1, title: 'Wireless Headphones', price: 79.99, image: 'https://placehold.co/200x150'},
  {id: 2, title: 'Mechanical Keyboard', price: 129.99, image: 'https://placehold.co/200x150'},
  {id: 3, title: 'USB-C Hub', price: 49.99, image: 'https://placehold.co/200x150'},
  {id: 4, title: 'Monitor Stand', price: 39.99, image: 'https://placehold.co/200x150'},
  {id: 5, title: 'Webcam HD', price: 59.99, image: 'https://placehold.co/200x150'},
  {id: 6, title: 'Mouse Pad XL', price: 24.99, image: 'https://placehold.co/200x150'},
];

export default function ProductGrid() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4 flex flex-col gap-2">
              <img src={product.image} alt={product.title} className="w-full rounded" />
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
