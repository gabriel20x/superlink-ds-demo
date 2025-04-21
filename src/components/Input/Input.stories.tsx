import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Card } from '../Card/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../Button/Button';

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
  text: z.string().min(1, 'Text is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  number: z.number({
    required_error: 'Number is required',
    invalid_type_error: 'Must be a number',
  }).min(1, 'Number must be greater than 0'),
  disabled: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      email: '',
      password: '',
      number: undefined,
      disabled: 'Disabled value',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
      <div>
        <Input
          {...register('text')}
          placeholder="Enter some text"
          error={!!errors.text}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          error={!!errors.email}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          error={!!errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('number', { valueAsNumber: true })}
          type="number"
          placeholder="Enter a number"
          error={!!errors.number}
        />
        {errors.number && (
          <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('disabled')}
          disabled
          error={!!errors.disabled}
        />
        {errors.disabled && (
          <p className="text-red-500 text-sm mt-1">{errors.disabled.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        label="Submit"
      />
    </form>
  );
};

export const Default: Story = {
  render: () => <FormExample />,
};

// Individual field examples
const FieldExample = ({ name, type = 'text', placeholder }: { name: keyof FormData; type?: string; placeholder: string }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="w-80">
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        error={!!errors[name]}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export const TextField: Story = {
  render: () => <FieldExample name="text" placeholder="Enter some text" />,
};

export const EmailField: Story = {
  render: () => <FieldExample name="email" type="email" placeholder="Enter your email" />,
};

export const PasswordField: Story = {
  render: () => <FieldExample name="password" type="password" placeholder="Enter your password" />,
};

export const NumberField: Story = {
  render: () => <FieldExample name="number" type="number" placeholder="Enter a number" />,
};

export const DisabledField: Story = {
  render: () => (
    <div className="w-80">
      <Input
        value="Disabled value"
        disabled
      />
    </div>
  ),
}; 