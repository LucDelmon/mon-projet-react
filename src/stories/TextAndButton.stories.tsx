import { Meta, StoryObj } from '@storybook/react';
import TextAndButton from '../TextAndButton';

const meta: Meta<typeof TextAndButton> = {
    component: TextAndButton,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TextAndButton>;

export const Basic: Story = {};

export const LongText: Story = {
    args: {
        text: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"",
    },
};
