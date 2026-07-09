import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect } from "../components/ui/native-select";

const meta: Meta<typeof NativeSelect> = {
  title: "Components/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="open" aria-label="Status">
      <option value="open">Open</option>
      <option value="in_progress">In progress</option>
      <option value="resolved">Resolved</option>
      <option value="closed">Closed</option>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled defaultValue="open" aria-label="Status">
      <option value="open">Open</option>
    </NativeSelect>
  ),
};
