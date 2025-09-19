import { Decorator } from '@storybook/react';
import { Card } from '../../components/Card/Card';

export const withCard: Decorator = (Story) => (
  <Card>
    <Story />
  </Card>
); 