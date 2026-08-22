// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {Meta, StoryObj} from '@storybook/react';
import {Tokenizer, TokenizerTouchSurface} from '@astryxdesign/core/Tokenizer';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import type {SearchableItem, SearchSource} from '@astryxdesign/core/Typeahead';
import {Banner} from '@astryxdesign/core/Banner';

const skills: SearchableItem[] = [
  {id: 'react', label: 'React'},
  {id: 'typescript', label: 'TypeScript'},
  {id: 'stylex', label: 'StyleX'},
  {id: 'node', label: 'Node'},
  {id: 'graphql', label: 'GraphQL'},
  {id: 'rust', label: 'Rust'},
  {id: 'go', label: 'Go'},
  {id: 'python', label: 'Python'},
  {id: 'swift', label: 'Swift'},
  {id: 'kotlin', label: 'Kotlin'},
  {id: 'figma', label: 'Figma'},
  {id: 'docker', label: 'Docker'},
];

const skillSource: SearchSource = {
  search: (query: string) =>
    skills.filter(s => s.label.toLowerCase().includes(query.toLowerCase())),
  bootstrap: () => skills,
};

const styles = stylex.create({
  // A handset's width, so the stories below read at the size they were
  // designed for even in a desktop browser.
  phone: {
    width: 390,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

const meta: Meta<typeof Tokenizer> = {
  title: 'Core/Tokenizer/Touch surface',
  component: Tokenizer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`Tokenizer` fits the pointer it is used with. With a mouse it is ' +
          'the field documented under Core/Tokenizer: chips that wrap around ' +
          'an inline text input, with suggestions in a popover. Where the ' +
          'primary pointer is a finger (`pointer: coarse`) the same ' +
          'component renders a surface built for one — chips on a single ' +
          'sideways-scrolling line so the form never reflows, and an Add ' +
          'button that opens a pinned-tall sheet whose search field sits ' +
          'above the keyboard.\n\n' +
          'Same props, same values, no new import: two surfaces of one ' +
          'component.\n\n' +
          '**Reviewing on a desktop browser:** the first story shows you the ' +
          'pointer surface, because that is the right answer for a mouse. ' +
          'Every other story renders `TokenizerTouchSurface`, which is the ' +
          'touch half with the pointer test skipped.',
      },
    },
  },
  decorators: [
    Story => (
      <div {...stylex.props(styles.phone)}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tokenizer>;

// ============================================================
// RESPONSIVE — the component as you would actually use it
// ============================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'On this desktop browser you are seeing the pointer surface. Open ' +
          'the same story on a phone, or in a device-emulated tab that ' +
          'reports a coarse pointer, and the same markup becomes a scrolling ' +
          'chip row with an Add button. Nothing at the call site changes.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([
      skills[0],
      skills[1],
    ]);
    // Report the surface actually on screen, rather than assuming a desktop.
    const isTouch = useMediaQuery('(pointer: coarse)');
    return (
      <>
        <Banner
          status={isTouch ? 'success' : 'info'}
          title={
            isTouch
              ? 'Coarse pointer: the touch surface'
              : 'Fine pointer: the pointer surface'
          }
        />
        <Tokenizer
          label="Skills"
          searchSource={skillSource}
          value={value}
          onChange={items => setValue(items)}
          placeholder="Search skills"
          width="100%"
        />
      </>
    );
  },
};

// ============================================================
// THE TOUCH SURFACE, forced — reviewable with a mouse
// ============================================================

export const TouchDefault: Story = {
  name: 'Touch: default',
  parameters: {
    docs: {
      description: {
        story:
          'Three chips and the Add button. Tap Add to open the suggestion ' +
          'sheet; tapping a row adds that token and leaves the sheet up for ' +
          'the next one.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([
      skills[0],
      skills[1],
      skills[2],
    ]);
    return (
      <TokenizerTouchSurface
        label="Skills"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search skills"
        width="100%"
      />
    );
  },
};

export const TouchManyTokens: Story = {
  name: 'Touch: more tokens than fit',
  parameters: {
    docs: {
      description: {
        story:
          'The chips scroll sideways within the field. The field stays ' +
          'exactly one line tall however many there are, so adding and ' +
          'removing never reflows the form below it, and Add stays put at ' +
          'the trailing edge rather than scrolling away with the chips.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>(skills.slice(0, 8));
    return (
      <TokenizerTouchSurface
        label="Skills"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search skills"
        hasClear
        width="100%"
      />
    );
  },
};

export const TouchEmpty: Story = {
  name: 'Touch: nothing selected',
  parameters: {
    docs: {
      description: {
        story:
          'With no tokens the placeholder holds the line. It doubles as the ' +
          "sheet's search placeholder, so write it as a search hint.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return (
      <TokenizerTouchSurface
        label="Skills"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search skills"
        width="100%"
      />
    );
  },
};

export const TouchCreatable: Story = {
  name: 'Touch: free-text tags',
  parameters: {
    docs: {
      description: {
        story:
          'With `hasCreate`, typing something the source does not have puts ' +
          'a Create row at the end of the list. The keyboard\u2019s return ' +
          'key commits it too.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return (
      <TokenizerTouchSurface
        label="Tags"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search or add a tag"
        hasCreate
        width="100%"
      />
    );
  },
};

export const TouchBounded: Story = {
  name: 'Touch: capped at maxEntries',
  parameters: {
    docs: {
      description: {
        story:
          'Add is disabled once the cap is reached, and the token that ' +
          'reaches it closes the sheet: there is nothing left to offer.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([skills[0]]);
    return (
      <TokenizerTouchSurface
        label="Skills"
        description="Up to 3"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search skills"
        maxEntries={3}
        width="100%"
      />
    );
  },
};

export const TouchStatus: Story = {
  name: 'Touch: validation status',
  parameters: {
    docs: {
      description: {
        story:
          'Status, description, and required treatment come from the same ' +
          'Field wrapper the pointer surface uses, so they look and behave ' +
          'identically on both.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return (
      <TokenizerTouchSurface
        label="Skills"
        searchSource={skillSource}
        value={value}
        onChange={items => setValue(items)}
        placeholder="Search skills"
        isRequired
        status={{type: 'error', message: 'Pick at least one skill'}}
        width="100%"
      />
    );
  },
};

export const TouchDisabled: Story = {
  name: 'Touch: disabled, with a reason',
  parameters: {
    docs: {
      description: {
        story:
          'With `disabledMessage` the Add button stays focusable under ' +
          '`aria-disabled` so the reason is reachable by keyboard and by ' +
          'tap, while the sheet stays shut.',
      },
    },
  },
  render: () => (
    <TokenizerTouchSurface
      label="Skills"
      searchSource={skillSource}
      value={[skills[0], skills[1]]}
      onChange={() => {}}
      placeholder="Search skills"
      isDisabled
      disabledMessage="Ask an admin to unlock this field"
      width="100%"
    />
  ),
};
