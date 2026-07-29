import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';

interface ResponsiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveSidebar({isOpen, onClose, children}: ResponsiveSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} aria-hidden="true" />
      <aside
        className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 p-6 overflow-y-auto shadow-lg
                   md:top-0 md:left-0 md:bottom-0 md:w-72
                   max-md:top-auto max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:w-full max-md:h-[60vh] max-md:rounded-t-2xl"
        role="complementary"
        aria-label="Sidebar"
      >
        <div className="hidden max-md:block w-10 h-1 bg-gray-300 rounded mx-auto mb-4" />
        <div className="flex flex-col gap-4">
          <Button variant="ghost" onPress={onClose}>Close</Button>
          {children}
        </div>
      </aside>
    </>
  );
}
