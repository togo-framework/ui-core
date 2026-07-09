import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="label-input">Email Address</Label>
      <Input id="label-input" type="email" placeholder="Enter email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="label-required">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input id="label-required" placeholder="Required field" />
    </div>
  ),
};
