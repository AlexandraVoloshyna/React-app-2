import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/common/button"

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  
} 

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    type: "button"
  },
};

export const Large: Story = {
  args: {
    children: "Large button",
    className: "text-lg"
  },
};

export const Small: Story = {
  args: {
    children: "Small button",
    className: "text-sm"
  },
}; 
export const Dropdown: Story = {
  args: {
    children: "dropdown button",
    type: "button",
    className: "w-full border-0 px-2.5 py-1.5 font-bold hover:bg-white hover:text-black hover:shadow-md",
  },
}; 
export const Form: Story = {
  args: {
    children: "form button",
    type: "button",
    className: "uppercase text-white bg-black",
  },
}; 