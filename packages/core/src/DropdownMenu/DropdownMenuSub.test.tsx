// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file DropdownMenuSub.test.tsx
 * @input vitest, @testing-library/react, DropdownMenu + submenu components
 * @output Unit tests for DropdownMenuSub / SubTrigger / SubContent (#3829)
 */

import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DropdownMenu} from './DropdownMenu';
import {DropdownMenuItem} from './DropdownMenuItem';
import {DropdownMenuSub} from './DropdownMenuSub';
import {DropdownMenuSubTrigger} from './DropdownMenuSubTrigger';
import {DropdownMenuSubContent} from './DropdownMenuSubContent';

beforeEach(() => {
  HTMLElement.prototype.showPopover = vi.fn(function (this: HTMLElement) {
    this.setAttribute('popover-open', '');
    const event = new Event('toggle', {bubbles: false});
    Object.defineProperty(event, 'newState', {value: 'open'});
    this.dispatchEvent(event);
  });
  HTMLElement.prototype.hidePopover = vi.fn(function (this: HTMLElement) {
    this.removeAttribute('popover-open');
    const event = new Event('toggle', {bubbles: false});
    Object.defineProperty(event, 'newState', {value: 'closed'});
    this.dispatchEvent(event);
  });
  const originalMatches = HTMLElement.prototype.matches;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (HTMLElement.prototype as any).matches = function (
    selector: string,
  ): boolean {
    if (selector === ':popover-open') {
      return this.hasAttribute('popover-open');
    }
    return originalMatches.call(this, selector);
  };
});

function MoveMenu({onMove}: {onMove?: (folder: string) => void} = {}) {
  return (
    <DropdownMenu button={{label: 'Actions'}}>
      <DropdownMenuItem label="Rename" onClick={() => {}} />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger label="Move to" />
        <DropdownMenuSubContent>
          <DropdownMenuItem label="Folder A" onClick={() => onMove?.('a')} />
          <DropdownMenuItem label="Folder B" onClick={() => onMove?.('b')} />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenu>
  );
}

describe('DropdownMenuSub', () => {
  it('renders the trigger with aria-haspopup and collapsed aria-expanded', async () => {
    const user = userEvent.setup();
    render(<MoveMenu />);
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the flyout on trigger click and exposes its items', async () => {
    const user = userEvent.setup();
    render(<MoveMenu />);
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    await user.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
    expect(
      screen.getByRole('menuitem', {name: 'Folder A', hidden: true}),
    ).toBeInTheDocument();
  });

  it('opens on ArrowRight and returns focus to the trigger on ArrowLeft', async () => {
    const user = userEvent.setup();
    render(<MoveMenu />);
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    // The menu focuses its first item (Rename) on open via rAF; wait for that
    // to settle before moving focus to the submenu trigger, so the deferred
    // focus can't steal it back mid-test.
    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', {name: 'Rename', hidden: true}),
      ).toHaveFocus();
    });
    trigger.focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
    // Focus moved into the flyout's first item.
    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', {name: 'Folder A', hidden: true}),
      ).toHaveFocus();
    });
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
    expect(trigger).toHaveFocus();
  });

  it('names the flyout from its trigger via aria-labelledby', async () => {
    const user = userEvent.setup();
    render(<MoveMenu />);
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    await user.click(trigger);
    const flyout = await screen.findByRole('menu', {
      name: /Move to/,
      hidden: true,
    });
    expect(flyout).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('invokes the nested item handler on selection', async () => {
    const user = userEvent.setup();
    const onMove = vi.fn();
    render(<MoveMenu onMove={onMove} />);
    await user.click(screen.getByRole('button', {name: /Actions/}));
    await user.click(
      screen.getByRole('menuitem', {name: /Move to/, hidden: true}),
    );
    await user.click(
      await screen.findByRole('menuitem', {name: 'Folder A', hidden: true}),
    );
    expect(onMove).toHaveBeenCalledWith('a');
  });

  it('does not open a disabled submenu', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu button={{label: 'Actions'}}>
        <DropdownMenuSub isDisabled>
          <DropdownMenuSubTrigger label="Move to" />
          <DropdownMenuSubContent>
            <DropdownMenuItem label="Folder A" onClick={() => {}} />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('DropdownMenu data-driven submenus', () => {
  it('renders a submenu when an item declares nested items', async () => {
    const user = userEvent.setup();
    const onMove = vi.fn();
    render(
      <DropdownMenu
        button={{label: 'Actions'}}
        items={[
          {label: 'Rename', onClick: () => {}},
          {
            label: 'Move to',
            items: [
              {
                label: 'Folder A',
                onClick: () => {
                  onMove('a');
                },
              },
              {
                label: 'Folder B',
                onClick: () => {
                  onMove('b');
                },
              },
            ],
          },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', {name: /Actions/}));
    const trigger = screen.getByRole('menuitem', {
      name: /Move to/,
      hidden: true,
    });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await user.click(trigger);
    await user.click(
      await screen.findByRole('menuitem', {name: 'Folder B', hidden: true}),
    );
    expect(onMove).toHaveBeenCalledWith('b');
  });
});
