import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select/Select';
import { Card } from '../components/Card/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/Button/Button';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

// Zod schema for form validation
const formSchema = z.object({
  select: z.string().min(1, 'Please select an option'),
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
      select: '',
      disabled: 'option1',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          {...register('select')}
          options={options}
          placeholder="Select an option"
          error={!!errors.select}
        />
        {errors.select && (
          <p className="text-red-500 text-sm mt-1">{errors.select.message}</p>
        )}

        <Select
          {...register('disabled')}
          options={options}
          disabled
          error={!!errors.disabled}
        />
        {errors.disabled && (
          <p className="text-red-500 text-sm mt-1">{errors.disabled.message}</p>
        )}

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
const FieldExample = ({ name, placeholder }: { name: keyof FormData; placeholder: string }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <Select
        {...register(name)}
        options={options}
        placeholder={placeholder}
        error={!!errors[name]}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </>
  );
};

export const WithPlaceholder: Story = {
  render: () => <FieldExample name="select" placeholder="Select an option" />,
};

export const Disabled: Story = {
  render: () => (
      <Select
        options={options}
        value="option1"
        disabled
      />
  ),
}; 