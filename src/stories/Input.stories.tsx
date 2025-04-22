import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input/Input';
import { Card } from '../components/Card/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/Button/Button';
import { HideIcon } from '../components/Icon/icons';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Card className="p-6">
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// Zod schema for form validation
const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  apiKey: z.string().min(1, 'API Key is required'),
});

type FormData = z.infer<typeof formSchema>;

// Base story with all props available for control
export const Default: Story = {
  args: {
    inputLabel: 'Input Label',
    placeholder: 'Enter value',
    size: 'L',
    helperText: 'This is a helper text',
    tooltip: 'This is a tooltip',
    inputFeedback: "This is a feedback"
  },
};

// Size variants
export const Large: Story = {
  args: {
    size: 'L',
    inputLabel: 'Large Input',
    placeholder: 'Large input',
  },
};

export const Medium: Story = {
  args: {
    size: 'M',
    inputLabel: 'Medium Input',
    placeholder: 'Medium input',
  },
};

export const Small: Story = {
  args: {
    size: 'S',
    inputLabel: 'Small Input',
    placeholder: 'Small input',
  },
};

export const FormValidation: Story = {
  render: function FormValidationStory() {
    const [isVisible, setIsVisible] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      reValidateMode: 'onChange'
    });

    const onSubmit = (data: FormData) => {
      console.log(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          {...register('username')}
          inputLabel="Username"
          placeholder="Enter username"
          error={!!errors.username}
          inputFeedback={errors.username?.message}
        />

        <Input
          {...register('email')}
          inputLabel="Email"
          type="email"
          placeholder="Enter email"
          error={!!errors.email}
          inputFeedback={errors.email?.message}
        />

        <Input
          {...register('password')}
          inputLabel="Password"
          type={isVisible ? "text" : "password"}
          placeholder="Enter password"
          error={!!errors.password}
          trailingIcon={<HideIcon fill={isVisible ? "#14171F" : "#727479"} />}
          inputFeedback={errors.password?.message}
          onTrailingIconClick={() => setIsVisible(!isVisible)}
        />

        <Input
          {...register('apiKey')}
          inputLabel="API Key"
          placeholder="Enter API key"
          error={!!errors.apiKey}
          inputFeedback={errors.apiKey?.message}
        />

        <Button
          type="submit"
          variant="primary"
          label="Submit"
        />
      </form>
    );
  }
};

// State variants
export const WithError: Story = {
  args: {
    inputLabel: 'Username',
    placeholder: 'Enter username',
    error: true,
    inputFeedback: 'Username is already taken',
  },
};

export const WithSuccess: Story = {
  args: {
    inputLabel: 'Username',
    placeholder: 'Enter username',
    inputFeedback: 'Username is available',
  },
};

export const WithWarning: Story = {
  args: {
    inputLabel: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    inputFeedback: 'Password should be stronger',
  },
};

// Feature variants
export const WithTrailingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input with trailing icon that toggles password visibility',
      },
    },
  },
  render: function WithTrailingIconComponent() {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        inputLabel="Password"
        type={isVisible ? "text" : "password"}
        placeholder="Enter password"
        trailingIcon={<HideIcon fill={isVisible ? "#14171F" : "#727479"} />}
        onTrailingIconClick={() => setIsVisible(!isVisible)}
      />
    );
  }
};

export const WithTooltip: Story = {
  args: {
    inputLabel: 'API Key',
    placeholder: 'Enter API key',
    tooltip: 'You can find your API key in the settings page',
    inputFeedback: 'Required for API access',
  },
};

export const Disabled: Story = {
  args: {
    inputLabel: 'Disabled Input',
    value: 'This field is disabled',
    disabled: true,
    inputFeedback: 'This field cannot be edited',
  },
};
