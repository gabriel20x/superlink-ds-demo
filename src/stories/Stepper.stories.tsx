import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stepper } from '../components/Stepper/Stepper';
import { StepperItem } from '../components/Stepper/StepperItem';
import { withCard } from './decorators/withCard';
import { Button } from '../components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: false,
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { },
  decorators: [withCard],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
    render: () => (
        <Stepper>
          <StepperItem label="Completed" state="completed" />
          <StepperItem label="In Progress" state="inProgress" />
          <StepperItem label="Pending" state="pending" />
        </Stepper>
    )
}

const WithActionsComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const steps = [
    { label: "Step 1", state: currentStep > 0 ? "completed" : currentStep === 0 ? "inProgress" : "pending" },
    { label: "Step 2", state: currentStep > 1 ? "completed" : currentStep === 1 ? "inProgress" : "pending" },
    { label: "Step 3", state: currentStep > 2 ? "completed" : currentStep === 2 ? "inProgress" : "pending" },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <Stepper>
        {steps.map((step, index) => (
          <StepperItem
            key={index}
            label={step.label}
            state={step.state as "completed" | "inProgress" | "pending"}
          />
        ))}
      </Stepper>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          size="S"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          label="Previous"
        />
        <Button
          variant="primary"
          size="S"
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1}
          label="Next"
        />
      </div>
    </div>
  );
};

export const WithActions: Story = {
  render: () => <WithActionsComponent />
}

