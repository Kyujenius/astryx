// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Button} from '@astryxdesign/core/Button';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="destructive" onPress={() => setIsOpen(true)}>
        Delete item
      </Button>
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
    </div>
  );
}
