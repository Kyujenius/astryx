// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('../docs-types').ComponentDoc} */

export const docs = {
  name: 'DropdownMenuSubTrigger',
  subComponentOf: 'DropdownMenu',
  displayName: 'Dropdown Menu Sub Trigger',
  isHiddenFromOverview: true,
  description:
    'The row that reveals a submenu flyout (role="menuitem", aria-haspopup="menu"). Right (Left in RTL) / Enter / Space or hover opens the flyout and moves focus to its first item. Must be a direct child of DropdownMenuSub.',
  playground: {
    defaults: {label: 'Move to'},
  },
  props: [
    {
      name: 'icon',
      type: 'IconType',
      description:
        'Icon to display before the label. See `npx astryx docs icons` for valid semantic names.',
    },
    {
      name: 'label',
      type: 'ReactNode',
      description: 'Primary label text.',
    },
    {
      name: 'description',
      type: 'ReactNode',
      description: 'Secondary description text displayed below the label.',
    },
    {
      name: 'hasSpinner',
      type: 'boolean',
      default: 'false',
      description:
        'Show a spinner in place of the caret, e.g. while a lazy submenu\u2019s children load.',
    },
  ],
};

export const docsZh = {
  name: 'DropdownMenuSubTrigger',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub Trigger',
  description:
    '打开子菜单弹出层的行（role="menuitem"，aria-haspopup="menu"）。方向键右（RTL 为左）/ 回车 / 空格或悬停即可打开。',
  props: [
    {name: 'icon', type: 'IconType', description: '标签前的图标。'},
    {name: 'label', type: 'ReactNode', description: '主标签文本。'},
    {
      name: 'description',
      type: 'ReactNode',
      description: '显示在标签下方的次要描述文本。',
    },
    {
      name: 'hasSpinner',
      type: 'boolean',
      description: '用加载指示器替代箭头，例如子菜单内容懒加载时。',
    },
  ],
};

export const docsDense = {
  name: 'DropdownMenuSubTrigger',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub Trigger',
  description: 'row that opens a submenu flyout (menuitem + aria-haspopup)',
  propDescriptions: {
    icon: 'icon before label',
    label: 'primary label text',
    description: 'secondary text below label',
    hasSpinner: 'spinner instead of caret for async submenus (default false)',
  },
};
