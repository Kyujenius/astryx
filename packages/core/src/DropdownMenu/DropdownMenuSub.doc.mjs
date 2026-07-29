// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('../docs-types').ComponentDoc} */

export const docs = {
  name: 'DropdownMenuSub',
  subComponentOf: 'DropdownMenu',
  displayName: 'Dropdown Menu Sub',
  isHiddenFromOverview: true,
  description:
    'Groups a submenu trigger with its flyout content. Place inside a DropdownMenu (or ContextMenu) alongside plain items. Pair a DropdownMenuSubTrigger with a DropdownMenuSubContent. Data mode: give a DropdownMenu item a nested `items` array instead.',
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description:
        'A DropdownMenuSubTrigger followed by a DropdownMenuSubContent.',
      required: true,
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the submenu is disabled. A disabled submenu renders its trigger but never opens the flyout.',
    },
    {
      name: 'onOpenChange',
      type: '(isOpen: boolean) => void',
      description: 'Called when the flyout opens or closes.',
    },
  ],
};

export const docsZh = {
  name: 'DropdownMenuSub',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub',
  description:
    '将子菜单触发器与其弹出内容分组。放在 DropdownMenu（或 ContextMenu）中，与普通项并列。',
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: '一个 DropdownMenuSubTrigger，后跟一个 DropdownMenuSubContent。',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: '子菜单是否禁用。禁用时仍渲染触发器，但不会打开弹出层。',
    },
    {
      name: 'onOpenChange',
      type: '(isOpen: boolean) => void',
      description: '弹出层打开或关闭时调用。',
    },
  ],
};

export const docsDense = {
  name: 'DropdownMenuSub',
  isHiddenFromOverview: true,
  displayName: 'Dropdown Menu Sub',
  description: 'groups a submenu trigger + flyout content inside a menu',
  propDescriptions: {
    children: 'a SubTrigger followed by a SubContent',
    isDisabled: 'disabled submenu never opens (default false)',
    onOpenChange: 'fired when the flyout opens/closes',
  },
};
