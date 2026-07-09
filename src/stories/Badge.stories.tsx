import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const SemanticStates: Story = {
  name: "Semantic States (government context)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-success/15 text-success border-success/30">Active</Badge>
      <Badge className="bg-warning/15 text-warning border-warning/30">Pending</Badge>
      <Badge className="bg-destructive/15 text-destructive border-destructive/30">Critical</Badge>
      <Badge className="bg-info/15 text-info border-info/30">Info</Badge>
      <Badge className="bg-alert-amber/15 text-alert-amber border-alert-amber/30">Alert</Badge>
    </div>
  ),
};

export const AsStatusIndicators: Story = {
  name: "Status Indicators",
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Badge variant="default">Active Intelligence</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="outline">Archived</Badge>
        <Badge variant="destructive">Breach</Badge>
      </div>
    </div>
  ),
};
