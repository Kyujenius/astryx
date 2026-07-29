import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';

interface ResponsiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveSidebar({isOpen, onClose, children}: ResponsiveSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 bottom-0 w-72 bg-background border-r p-6 overflow-y-auto">
        {children}
      </aside>

      {/* Mobile bottom sheet */}
      <div className="md:hidden">
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <div className="fixed bottom-0 left-0 right-0 h-[60vh] bg-background rounded-t-2xl z-50 p-6 overflow-y-auto">
              <div className="w-10 h-1 bg-muted rounded mx-auto mb-4" />
              <Button variant="ghost" onClick={onClose} className="mb-4">Close</Button>
              {children}
            </div>
          </>
        )}
      </div>
    </>
  );
}
