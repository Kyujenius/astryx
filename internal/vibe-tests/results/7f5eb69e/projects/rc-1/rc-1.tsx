import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavItem} from '@astryxdesign/core/TopNav';
import {TopNavHeading} from '@astryxdesign/core/TopNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {useState} from 'react';

export default function ResponsiveNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <TopNav>
        <TopNavHeading>Acme App</TopNavHeading>
        <TopNavItem label="Home" href="/" isSelected />
        <TopNavItem label="Products" href="/products" />
        <TopNavItem label="About" href="/about" />
        <TopNavItem label="Contact" href="/contact" />
      </TopNav>
      <MobileNav
        isOpen={isMobileOpen}
        onOpenChange={setIsMobileOpen}
        title="Acme App"
      >
        <TopNavItem label="Home" href="/" isSelected />
        <TopNavItem label="Products" href="/products" />
        <TopNavItem label="About" href="/about" />
        <TopNavItem label="Contact" href="/contact" />
      </MobileNav>
    </>
  );
}
