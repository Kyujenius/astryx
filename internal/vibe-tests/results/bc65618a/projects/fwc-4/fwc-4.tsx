import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/DialogHeader';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/LayoutContent';
import {LayoutFooter} from '@astryxdesign/core/LayoutFooter';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4">
      <Button label="Delete item" variant="destructive" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} width={420}>
        <Layout>
          <DialogHeader title="Delete item" />
          <LayoutContent padding={4}>
            <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
          </LayoutContent>
          <LayoutFooter padding={4}>
            <HStack gap={2} hAlign="end">
              <Button label="Cancel" variant="secondary" onClick={() => setIsOpen(false)} />
              <Button label="Delete" variant="destructive" onClick={() => setIsOpen(false)} />
            </HStack>
          </LayoutFooter>
        </Layout>
      </Dialog>
    </div>
  );
}
