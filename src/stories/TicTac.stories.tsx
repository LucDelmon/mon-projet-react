import type { Meta, StoryObj } from '@storybook/react';

import TicTac from '../TicTac';

const meta = {
  component: TicTac,
} satisfies Meta<typeof TicTac>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    row_count: 3,
  }
};

export const Big: Story = {
  args: {
    row_count: 4,
  }
};
