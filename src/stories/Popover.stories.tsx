import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const meta: Meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Source Details</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Reliability</span>
              <Badge variant="secondary">B2</Badge>
            </div>
            <div className="flex justify-between">
              <span>Last verified</span>
              <span>2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>Credibility</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
