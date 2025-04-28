import type { Meta, StoryObj } from '@storybook/react';
import { OtpInput } from '../components/OtpInput/OtpInput';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const meta: Meta<typeof OtpInput> = {
  title: 'Components/OtpInput',
  component: OtpInput,
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
type Story = StoryObj<typeof OtpInput>;

// Zod schema for form validation
const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type FormData = z.infer<typeof formSchema>;

const FormExample = ({ variant = 'small' }: { variant?: 'small' | 'large' }) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = watch('otp');

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <OtpInput
          value={otpValue}
          onChange={(value) => setValue('otp', value)}
          error={!!errors.otp}
          variant={variant}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        label="Verify"
      />
    </form>
  );
};

export const Small: Story = {
  render: () => <FormExample variant="small" />,
};

export const Large: Story = {
  render: () => <FormExample variant="large" />,
};

// Individual field examples
const FieldExample = ({ length = 6 }: { length?: number }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const otpValue = watch('otp');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OtpInput
        value={otpValue}
        onChange={(value) => setValue('otp', value)}
        length={length}
        error={!!errors.otp}
      />
      {errors.otp && (
        <p className="text-red-500 text-sm mt-1 text-center">{errors.otp.message}</p>
      )}
    </div>
  );
};

export const WithCustomLength: Story = {
  render: () => <FieldExample length={8} />,
};

const ErrorExample = () => {
  const {
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const otpValue = watch('otp');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OtpInput
        value={otpValue}
        onChange={(value) => setValue('otp', value)}
        error
      />
    </div>
  );
};

export const WithError: Story = {
  render: () => <ErrorExample />,
}; 