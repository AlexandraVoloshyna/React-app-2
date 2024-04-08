import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/common/input"

const meta: Meta<typeof Input> = {
  title: "components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  
} 

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    type: "text",
    className: "w-full bg-transparent px-[3.5px] py-3 text-md",
    placeholder: "enter something"
  },
};

export const FormInput: Story = {
  args: {
    ...DefaultInput.args, 
    className: "border-2 border-solid border-black rounded-lg",
    placeholder: "enter something"

  },
};
