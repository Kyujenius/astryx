import {useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate delete operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDeleting(false);
    setIsOpen(false);
  };

  return (
    <Stack gap={3} padding={4}>
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
    </Stack>
  );
}
