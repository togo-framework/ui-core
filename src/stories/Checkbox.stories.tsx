import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-default" />
      <Label htmlFor="cb-default">Enable alerts</Label>
    </div>
  ),
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="cb-unchecked" />
        <Label htmlFor="cb-unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-checked" defaultChecked />
        <Label htmlFor="cb-checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-disabled" disabled />
        <Label htmlFor="cb-disabled" className="text-muted-foreground">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-disabled-checked" defaultChecked disabled />
        <Label htmlFor="cb-disabled-checked" className="text-muted-foreground">Disabled + Checked</Label>
      </div>
    </div>
  ),
};

export const RTLCheckboxes: Story = {
  name: "RTL Layout",
  render: () => (
    <div className="flex flex-col gap-3" dir="rtl">
      <div className="flex items-center gap-2">
        <Checkbox id="cb-rtl-1" />
        <Label htmlFor="cb-rtl-1">تفعيل التنبيهات</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-rtl-2" defaultChecked />
        <Label htmlFor="cb-rtl-2">تلقي الإشعارات</Label>
      </div>
    </div>
  ),
};
