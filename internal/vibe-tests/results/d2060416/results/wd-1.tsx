import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stepper} from '@astryxdesign/core/Stepper';
import {Divider} from '@astryxdesign/core/Divider';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  return (
    <Stack gap="lg">
      <Stepper steps={['Cart', 'Shipping', 'Payment', 'Confirmation']} activeStep={['cart','shipping','payment','confirmation'].indexOf(step)} />
      <Card>
        {step === 'cart' && (<Stack gap="md"><Heading level={2}>Cart Summary</Heading><Text>Review your items.</Text><Divider /><Button variant="filled" onPress={() => setStep('shipping')}>Continue to Shipping</Button></Stack>)}
        {step === 'shipping' && (<Stack gap="md"><Heading level={2}>Shipping</Heading><TextInput label="Full Name" /><TextInput label="Address" /><TextInput label="City" /><TextInput label="ZIP" /><Stack direction="horizontal" gap="sm"><Button variant="default" onPress={() => setStep('cart')}>Back</Button><Button variant="filled" onPress={() => setStep('payment')}>Continue</Button></Stack></Stack>)}
        {step === 'payment' && (<Stack gap="md"><Heading level={2}>Payment</Heading><TextInput label="Card Number" /><Stack direction="horizontal" gap="sm"><TextInput label="Expiry" /><TextInput label="CVV" /></Stack><Stack direction="horizontal" gap="sm"><Button variant="default" onPress={() => setStep('shipping')}>Back</Button><Button variant="filled" onPress={() => setStep('confirmation')}>Place Order</Button></Stack></Stack>)}
        {step === 'confirmation' && (<Stack gap="md"><Heading level={2}>Order Confirmed!</Heading><Text>Thank you for your purchase.</Text></Stack>)}
      </Card>
    </Stack>
  );
}
