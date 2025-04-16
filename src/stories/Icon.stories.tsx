import type { Meta, StoryObj } from '@storybook/react';
import { 
  InfoIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronArrowUpIcon,
  ChevronArrowDownIcon,
  ExpandMoreIcon,
  CheckFullIcon,
  CheckOutlinedIcon,
  WarningIcon,
  FavIcon,
  HideIcon,
  LockIcon,
  HelpFullIcon,
  HelpOutlinedIcon
} from '../components/Icon/icons';

const meta: Meta<typeof InfoIcon> = {
  title: 'System/Icons',
  component: InfoIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Our design system includes a set of carefully crafted icons that maintain consistency across the application. Each icon is available as an individual component.

## Usage
\`\`\`tsx
import { ArrowBackIcon } from '../components/Icon/icons';

// Usage
<ArrowBackIcon width={24} />
\`\`\`

## Guidelines
1. **Size**: Icons should be used at their default size (24x24px) unless specified otherwise
2. **Color**: Icons inherit their color from their parent element's text color
3. **Accessibility**: All icons should have appropriate aria-labels when used without accompanying text
4. **Consistency**: Use the same icon for the same action throughout the application

## Best Practices
- Use icons to enhance visual communication, not replace text
- Ensure icons are used consistently across similar actions
- Provide text alternatives for important icons
- Consider color contrast for accessibility
- Use appropriate icon sizes based on context
        `,
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 16, max: 48, step: 4 },
      description: 'The width of the icon in pixels',
    },
    height: {
      control: { type: 'range', min: 16, max: 48, step: 4 },
      description: 'The height of the icon in pixels',
    },
    fill: {
      control: 'color',
      description: 'The color of the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoIcon>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
  },
};

export const Colored: Story = {
  args: {
    width: 24,
    height: 24,
    fill: '#ff0000',
  },
};

export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <ArrowBackIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ArrowBackIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ArrowForwardIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ArrowForwardIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronArrowUpIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronArrowUpIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronArrowDownIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronArrowDownIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ExpandMoreIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ExpandMoreIcon</div>
      </div>
    </div>
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <CheckFullIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>CheckFullIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CheckOutlinedIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>CheckOutlinedIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <WarningIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>WarningIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InfoIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>InfoIcon</div>
      </div>
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <FavIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>FavIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <HideIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>HideIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LockIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>LockIcon</div>
      </div>
    </div>
  ),
};

export const HelpIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <HelpFullIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>HelpFullIcon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <HelpOutlinedIcon width={32} height={32} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>HelpOutlinedIcon</div>
      </div>
    </div>
  ),
}; 