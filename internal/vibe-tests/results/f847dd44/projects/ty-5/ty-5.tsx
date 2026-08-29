import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Center} from '@astryxdesign/core/Center';

export default function Hero() {
  return (
    <Center>
      <VStack gap="lg" align="center">
        <Heading level={1} type="display-1">Build faster with Astryx</Heading>
        <Text type="large" justify="center">
          A design system built for speed, accessibility, and consistency. Ship beautiful interfaces without starting from scratch.
        </Text>
        <Button label="Get Started" variant="primary" size="lg" />
      </VStack>
    </Center>
  );
}
