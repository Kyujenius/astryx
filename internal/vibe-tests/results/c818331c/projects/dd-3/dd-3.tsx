import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

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
      <Heading level={2}>Products</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {PRODUCTS.map((product) => (
          <Card key={product.id} padding={3}>
            <div className="flex flex-col gap-2">
              <img src={product.image} alt={product.title} className="w-full rounded" />
              <Heading level={4}>{product.title}</Heading>
              <Text type="large" weight="semibold">${product.price.toFixed(2)}</Text>
              <Button label="Add to cart" variant="primary" width="100%" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
