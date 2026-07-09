import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="sw-default" />
      <Label htmlFor="sw-default">Enable feature</Label>
    </div>
  ),
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="sw-off" />
        <Label htmlFor="sw-off">Off</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="sw-on" defaultChecked />
        <Label htmlFor="sw-on">On</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="sw-disabled" disabled />
        <Label htmlFor="sw-disabled" className="text-muted-foreground">Disabled Off</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="sw-disabled-on" defaultChecked disabled />
        <Label htmlFor="sw-disabled-on" className="text-muted-foreground">Disabled On</Label>
      </div>
    </div>
  ),
};

export const RTLSwitch: Story = {
  name: "RTL — thumb travels RTL-aware",
  render: () => (
    <div className="flex flex-col gap-3" dir="rtl">
      <div className="flex items-center gap-3">
        <Label htmlFor="sw-rtl-off">إيقاف</Label>
        <Switch id="sw-rtl-off" dir="rtl" />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="sw-rtl-on">تشغيل</Label>
        <Switch id="sw-rtl-on" dir="rtl" defaultChecked />
      </div>
    </div>
  ),
};
