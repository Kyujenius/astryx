import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  header: {
    position: 'relative',
    minHeight: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  coverImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },
  iconPicker: {
    position: 'absolute',
    bottom: -24,
    left: 24,
    fontSize: 48,
    cursor: 'pointer',
  },
  content: {
    paddingTop: 32,
  },
});

const icons = ['📄', '🎯', '🚀', '📊', '💡', '🔥', '✨', '📝'];
const covers = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverIndex, setCoverIndex] = useState(0);
  const [showIconPicker, setShowIconPicker] = useState(false);

  return (
    <Card width="100%" padding={0}>
      <div {...stylex.props(styles.header)} style={{background: covers[coverIndex]}}>
        <Button
          label="Change cover"
          variant="ghost"
          size="sm"
          onClick={() => setCoverIndex((i) => (i + 1) % covers.length)}
        />
      </div>
      <div {...stylex.props(styles.iconPicker)} onClick={() => setShowIconPicker(!showIconPicker)}>
        {icon}
      </div>
      {showIconPicker && (
        <div>
          {icons.map((emoji) => (
            <Button
              key={emoji}
              label={emoji}
              variant="ghost"
              onClick={() => {
                setIcon(emoji);
                setShowIconPicker(false);
              }}
            />
          ))}
        </div>
      )}
      <div {...stylex.props(styles.content)}>
        <Heading level={1}>Untitled</Heading>
      </div>
    </Card>
  );
}
