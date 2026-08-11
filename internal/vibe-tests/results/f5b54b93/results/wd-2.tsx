// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Progress} from '@/components/ui/progress';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({name: '', email: '', phone: ''});

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-md mx-auto space-y-6 p-6">
      <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>

      {currentStep === 0 && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
      )}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="bg-muted p-4 rounded-lg space-y-1">
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}>
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
