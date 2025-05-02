import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '../components/Button/Button';
import { ArrowBackIcon, FavIcon } from '../components/Icon/icons';
import { withCard } from './decorators/withCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: { control: 'select' },
    size: { control: 'select' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
  decorators: [withCard],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: "Button",
    variant: "tertiary"
  }
};

export const Text: Story = {
  args: {
    label: "Button",
    variant: "text"
  }
};

export const Destructive: Story = {
  args: {
    label: "Button",
    variant: "destructive"
  }
};

export const Disabled: Story = {
  args: {
    label: "Button",
    variant: "primary",
    disabled: true,
  }
};

export const Loading: Story = {
  args: {
    label: "Button",
    variant: "primary",
    loading: true,
  }
};

export const ButtonWithLeftIcon: Story = {
  args: {
    variant: 'text',
    label: 'Back',
    icon: React.createElement(ArrowBackIcon, { width: 16, height: 16 }),
    iconPosition: 'left',
    width: 'fit',
  },
};

export const ButtonWithRightIcon: Story = {
  args: {
    label: 'Liked',
    icon: React.createElement(FavIcon),
    iconPosition: 'right',
  },
};

