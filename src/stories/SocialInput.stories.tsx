import type { Meta, StoryObj } from '@storybook/react';
import { SocialInput } from '../components/SocialInput/SocialInput';
import { Card } from '../components/Card/Card';

const meta: Meta<typeof SocialInput> = {
  title: 'Components/SocialInput',
  component: SocialInput,
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
type Story = StoryObj<typeof SocialInput>;

// Base story with all props available for control
export const Default: Story = {
  args: {
    variant: 'facebook',
    inputLabel: 'Facebook Profile',
    placeholder: '@username',
    size: 'L',
  },
};

// Social Media Variants
export const Facebook: Story = {
  args: {
    variant: 'facebook',
    inputLabel: 'Facebook Profile',
    placeholder: 'Enter your Facebook username',
  },
};

export const Instagram: Story = {
  args: {
    variant: 'instagram',
    inputLabel: 'Instagram Handle',
    placeholder: '@instagram_handle',
  },
};

export const Youtube: Story = {
  args: {
    variant: 'youtube',
    inputLabel: 'YouTube Channel',
    placeholder: 'Enter your channel name',
  },
};

export const Spotify: Story = {
  args: {
    variant: 'spotify',
    inputLabel: 'Spotify Artist',
    placeholder: 'Enter your artist name',
  },
};

export const TikTok: Story = {
  args: {
    variant: 'tiktok',
    inputLabel: 'TikTok Handle',
    placeholder: '@tiktok_handle',
  },
};

export const Snapchat: Story = {
  args: {
    variant: 'snapchat',
    inputLabel: 'Snapchat Username',
    placeholder: '@snapchat_username',
  },
};

export const Twitter: Story = {
  args: {
    variant: 'x',
    inputLabel: 'X Handle',
    placeholder: '@x_handle',
  },
};

export const OnlyFans: Story = {
  args: {
    variant: 'onlyfans',
    inputLabel: 'OnlyFans Handle',
    placeholder: '@onlyfans_handle',
  },
};

// Size variants
export const Large: Story = {
  args: {
    variant: 'facebook',
    size: 'L',
    inputLabel: 'Large Input',
    placeholder: '@username',
  },
};

export const Medium: Story = {
  args: {
    variant: 'instagram',
    size: 'M',
    inputLabel: 'Medium Input',
    placeholder: '@username',
  },
};

export const Small: Story = {
  args: {
    variant: 'x',
    size: 'S',
    inputLabel: 'Small Input',
    placeholder: '@username',
  },
};

// State variants
export const WithError: Story = {
  args: {
    variant: 'facebook',
    inputLabel: 'Username',
    placeholder: '@username',
    error: true,
    inputFeedback: 'This username is already taken',
  },
};

export const WithSuccess: Story = {
  args: {
    variant: 'instagram',
    inputLabel: 'Username',
    placeholder: '@username',
    inputFeedback: 'Username is available',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'facebook',
    inputLabel: 'Locked Profile',
    value: '@locked_profile',
    disabled: true,
    inputFeedback: 'This profile cannot be edited',
  },
}; 