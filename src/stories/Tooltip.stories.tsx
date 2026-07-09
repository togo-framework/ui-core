import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { Info } from "lucide-react";

const meta: Meta = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a helpful tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const AllSides: Story = {
  name: "All Placement Sides",
  render: () => (
    <div className="flex gap-8 items-center justify-center p-16">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  name: "Icon Trigger",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Information">
          <Info className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Source reliability rated B2 based on historical accuracy and verification frequency.
      </TooltipContent>
    </Tooltip>
  ),
};
