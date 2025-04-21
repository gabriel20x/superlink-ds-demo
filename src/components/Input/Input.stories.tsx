import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState, useRef, useEffect } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={setValue}
      placeholder="Type something..."
    />
  );
};

const InputWithRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    // Focus the input after 1 second
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={setValue}
      placeholder="This input will auto-focus"
    />
  );
};

export const Default: Story = {
  render: () => <InputWithState />,
};

export const WithRef: Story = {
  render: () => <InputWithRef />,
};

export const WithPlaceholder: Story = {
  render: () => <Input value="" onChange={() => {}} placeholder="Enter your name" />,
};

export const Disabled: Story = {
  render: () => <Input value="Disabled input" onChange={() => {}} disabled />,
};

export const Error: Story = {
  render: () => <Input value="Invalid input" onChange={() => {}} error />,
};

export const Password: Story = {
  render: () => <Input value="password123" onChange={() => {}} type="password" />,
};

export const Email: Story = {
  render: () => <Input value="user@example.com" onChange={() => {}} type="email" />,
};

export const Number: Story = {
  render: () => <Input value="42" onChange={() => {}} type="number" />,
}; 