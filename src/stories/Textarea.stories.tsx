import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter notes...",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label>Default</Label>
        <Textarea placeholder="Enter analysis notes..." />
      </div>
      <div>
        <Label>Filled</Label>
        <Textarea defaultValue="This entity has been identified in 14 cross-referenced events." />
      </div>
      <div>
        <Label>Disabled</Label>
        <Textarea placeholder="Read-only field" disabled />
      </div>
      <div dir="rtl">
        <Label>Arabic RTL</Label>
        <Textarea placeholder="أدخل الملاحظات..." dir="rtl" />
      </div>
    </div>
  ),
};
