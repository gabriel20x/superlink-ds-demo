import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../components/PhoneInput/PhoneInput';

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

export const WithHelperText: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    helperText: 'Include country code',
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

export const Small: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    size: 'S',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    size: 'M',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    size: 'L',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    disabled: true,
  },
};

export const WithEvents: Story = {
  args: {
    placeholder: 'Enter phone number',
    inputLabel: 'Phone Number',
    onChange: (e) => console.log('Phone number changed:', e.target.value),
    onCountryChange: (country) => console.log('Country changed:', country),
  },
}; 