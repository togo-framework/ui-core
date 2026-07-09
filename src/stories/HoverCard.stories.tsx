import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../components/ui/hover-card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

const meta: Meta = {
  title: "Components/HoverCard",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">ENT-2026-0042</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Unknown Entity Alpha</h4>
            <p className="text-xs text-muted-foreground">Organization · 14 events cross-referenced</p>
            <div className="flex gap-1 pt-1">
              <Badge variant="destructive" className="text-2xs">Critical Risk</Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
