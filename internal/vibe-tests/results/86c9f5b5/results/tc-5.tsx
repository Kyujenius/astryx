import {Card} from '@astryxdesign/core/Card';
import {Theme} from '@astryxdesign/core/theme';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function CustomThemedCard() {
  return (
    <Theme>
      <div className="p-8 flex flex-col gap-4">
        <Card>
          <div className="border-2 border-transparent bg-clip-padding rounded-2xl p-6"
               style={{borderImage: 'linear-gradient(135deg, #667eea, #764ba2) 1'}}>
            <Heading level={2}>Gradient Border Card</Heading>
            <Text>
              This card uses a gradient border and increased border-radius
              via CSS custom properties and Tailwind utilities.
            </Text>
          </div>
        </Card>

        <Card>
          <div className="border-2 border-transparent bg-clip-padding rounded-2xl p-6"
               style={{borderImage: 'linear-gradient(135deg, #667eea, #764ba2) 1'}}>
            <Heading level={2}>Another Themed Card</Heading>
            <Text>
              Both cards share the same custom appearance.
            </Text>
          </div>
        </Card>
      </div>
    </Theme>
  );
}
