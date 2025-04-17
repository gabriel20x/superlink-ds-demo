import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from '../components/Stepper/Stepper';
import { StepperItems } from '../components/Stepper/StepperItems';
import { withCard } from './decorators/withCard';

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
          <StepperItems label="Completed" state="completed" />
          <StepperItems label="In Progress" state="inProgress" />
          <StepperItems label="Pending" state="pending" />
        </Stepper>
    )
}

