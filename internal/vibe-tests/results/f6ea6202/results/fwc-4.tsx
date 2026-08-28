import {useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Button} from '@astryxdesign/core/Button';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDeleting(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <Button variant="destructive" onPress={() => setIsOpen(true)}>
        Delete item
      </Button>
      <AlertDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Are you sure you want to delete this item?"
        description="This action cannot be undone. The item and all associated data will be permanently removed."
        actionLabel="Delete"
        onAction={handleDelete}
        isActionLoading={isDeleting}
        cancelLabel="Cancel"
      />
    </div>
  );
}
