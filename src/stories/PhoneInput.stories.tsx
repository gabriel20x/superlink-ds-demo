import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../components/PhoneInput/PhoneInput';
import { Button } from '../components/Button/Button';
import { usePhoneInput } from '../hooks/usePhoneInput';
import { useState } from 'react';

const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    error: true,
    inputFeedback: 'Invalid phone number',
  },
};

export const WithTooltip: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    tooltip: 'Enter your phone number including country code',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    disabled: true,
  },
};

const PhoneInputWithEvents = () => {
  const [showNumber, setShowNumber] = useState(false);
  const {
    phoneNumber,
    isValid,
    handlePhoneChange,
    handleValidation,
    handleCountryChange,
  } = usePhoneInput();

  const sendPhoneNumber = () => {
    console.log(phoneNumber);
    setShowNumber(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <PhoneInput
        placeholder="Enter phone number"
        inputLabel="Phone Number"
        onChange={handlePhoneChange}
        onCountryChange={handleCountryChange}
        isValid={handleValidation}
      />
      <Button 
        onClick={sendPhoneNumber}
        disabled={!isValid}
        label="Show Phone Number"
      >
        Show Phone Number
      </Button>
      {showNumber && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Phone Number:</strong> {phoneNumber}
        </div>
      )}
    </div>
  );
};

export const WithEvents: Story = {
  render: () => <PhoneInputWithEvents />,
}; 