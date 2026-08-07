import {useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Button} from '@astryxdesign/core/Button';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    setIsOpen(false);
  };

  return (
    <>
      <Button
        label="Delete item"
        variant="destructive"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Delete item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        actionLabel="Delete"
        onAction={handleDelete}
        cancelLabel="Cancel"
        actionVariant="destructive"
      />
    </>
  );
}
