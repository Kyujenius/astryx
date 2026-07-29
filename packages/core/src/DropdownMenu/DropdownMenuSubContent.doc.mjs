// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('../docs-types').ComponentDoc} */

export const docs = {
  name: 'DropdownMenuSubContent',
  subComponentOf: 'DropdownMenu',
  displayName: 'Dropdown Menu Sub Content',
  isHiddenFromOverview: true,
  description:
    'The flyout menu (role="menu") revealed by a DropdownMenuSubTrigger. Opens inline-end of the trigger by default (RTL-correct) and auto-flips at the viewport edge. Must be a direct child of DropdownMenuSub, after the trigger.',
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: 'The flyout\u2019s menu items.',
      required: true,
    },
    {
      name: 'menuWidth',
      type: 'number | string',
      description:
        'Fixed flyout width. Defaults to sizing to its content (min 160px).',
    },
    {
      name: 'aria-label',
      type: 'string',
      description:
        'Accessible name for the flyout. Defaults to the trigger\u2019s label via aria-labelledby, so an explicit value is rarely needed.',
    },
  ],
};

export const docsZh = {
  name: 'DropdownMenuSubContent',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub Content',
  description:
    '由 DropdownMenuSubTrigger 打开的弹出菜单（role="menu"）。默认在触发器的行内末端打开（RTL 正确），并在视口边缘自动翻转。',
  props: [
    {name: 'children', type: 'ReactNode', description: '弹出层的菜单项。'},
    {
      name: 'menuWidth',
      type: 'number | string',
      description: '固定弹出层宽度。默认按内容自适应（最小 160px）。',
    },
    {
      name: 'aria-label',
      type: 'string',
      description:
        '弹出层的无障碍名称。默认通过 aria-labelledby 取触发器标签，通常无需显式设置。',
    },
  ],
};

export const docsDense = {
  name: 'DropdownMenuSubContent',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub Content',
  description: 'flyout menu revealed by a SubTrigger; inline-end + auto-flip',
  propDescriptions: {
    children: 'the flyout menu items',
    menuWidth: 'fixed flyout width (default content-sized, min 160px)',
    'aria-label': 'flyout name (defaults to trigger label via aria-labelledby)',
  },
};
