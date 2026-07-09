import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Above separator</p>
      <Separator className="my-4" />
      <p className="text-sm">Below separator</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <span className="text-sm">Entities</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Events</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Reports</span>
    </div>
  ),
};
