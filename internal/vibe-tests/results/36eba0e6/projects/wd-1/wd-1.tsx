import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];
  const idx = steps.indexOf(step);
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between mb-8">{steps.map((s, i) => (<div key={s} className={`flex items-center ${i <= idx ? 'text-blue-600' : 'text-gray-400'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= idx ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{i + 1}</div><span className="ml-2 text-sm capitalize hidden sm:inline">{s}</span></div>))}</div>
      <div className="bg-white rounded-lg shadow p-6">
        {step === 'cart' && (<div className="space-y-4"><Heading level={2}>Cart Summary</Heading><Text>Review your items.</Text><hr className="border-gray-200" /><Button variant="filled" onPress={() => setStep('shipping')}>Continue to Shipping</Button></div>)}
        {step === 'shipping' && (<div className="space-y-4"><Heading level={2}>Shipping</Heading><TextInput label="Full Name" /><TextInput label="Address" /><div className="flex gap-4"><TextInput label="City" /><TextInput label="ZIP" /></div><div className="flex gap-2"><Button variant="default" onPress={() => setStep('cart')}>Back</Button><Button variant="filled" onPress={() => setStep('payment')}>Continue</Button></div></div>)}
        {step === 'payment' && (<div className="space-y-4"><Heading level={2}>Payment</Heading><TextInput label="Card Number" /><div className="flex gap-4"><TextInput label="Expiry" /><TextInput label="CVV" /></div><div className="flex gap-2"><Button variant="default" onPress={() => setStep('shipping')}>Back</Button><Button variant="filled" onPress={() => setStep('confirmation')}>Place Order</Button></div></div>)}
        {step === 'confirmation' && (<div className="text-center space-y-4"><Heading level={2}>Order Confirmed!</Heading><Text>Thank you for your purchase.</Text></div>)}
      </div>
    </div>
  );
}
