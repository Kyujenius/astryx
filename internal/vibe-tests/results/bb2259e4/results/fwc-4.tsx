import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Button} from '@astryxdesign/core/Button';
import {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onPress={() => setIsOpen(true)}>
        Delete Item
      </Button>
      <AlertDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Are you sure you want to delete this item?"
        description="This action cannot be undone. The item will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
