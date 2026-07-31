import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ProductDetailPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/headphones">Headphones</BreadcrumbItem>
        <BreadcrumbItem>Studio Pro Max</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex gap-6">
        <img className="w-1/2 h-96 object-cover rounded-lg" src="https://picsum.photos/600/400" alt="Studio Pro Max Headphones" />
        <div className="flex flex-col gap-3">
          <Heading level={1}>Studio Pro Max</Heading>
          <Text color="secondary">Premium wireless headphones with active noise cancellation</Text>
          <Heading level={2}>$349.99</Heading>
          <Card padding={3} variant="muted">
            <div className="flex flex-col gap-2">
              <Text weight="semibold">Key Features</Text>
              <Text>Active Noise Cancellation</Text>
              <Text>40-hour battery life</Text>
              <Text>Spatial Audio support</Text>
              <Text>Premium memory foam cushions</Text>
            </div>
          </Card>
          <div className="flex gap-2">
            <Button label="Add to Cart" variant="primary" />
            <Button label="Save for Later" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
