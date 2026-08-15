import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';

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
        <Card key={product.id} padding={0} elevation="low">
          <div className="flex flex-col gap-3">
            <Thumbnail src={product.image} alt={product.title} />
            <div className="flex flex-col gap-2 p-4">
              <Heading level={4}>{product.title}</Heading>
              <Text type="large" weight="semibold">${product.price.toFixed(2)}</Text>
              <Button label="Add to cart" variant="primary" width="100%" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
