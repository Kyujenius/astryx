import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <VStack gap={4} padding={8} hAlign="center">
        <Heading level={1} type="display-1">Build faster with Astryx</Heading>
        <Text size="lg" color="secondary">
          A modern design system for building consistent, accessible, and beautiful user interfaces at scale.
        </Text>
        <Button label="Get Started" variant="primary" size="lg" onClick={() => {}} />
      </VStack>
    </div>
  );
}
