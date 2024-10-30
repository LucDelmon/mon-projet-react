import type { Meta, StoryObj } from '@storybook/react';

import TicTac from '../TicTac';

const meta = {
  component: TicTac,
} satisfies Meta<typeof TicTac>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
