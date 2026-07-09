import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const meta: Meta = {
  title: "Components/Sheet",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Entity Detail</SheetTitle>
          <SheetDescription>ENT-2026-0042 — full intelligence profile</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Level</span>
            <Badge variant="destructive">Critical</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Events</span>
            <span className="text-sm font-medium">14 cross-referenced</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Activity</span>
            <span className="text-sm font-medium">2h ago</span>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button>View Full Profile</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  name: "Left Side",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-2">
          {["Dashboard", "Entities", "Events", "Narratives", "Reports"].map((item) => (
            <Button key={item} variant="ghost" className="w-full justify-start">{item}</Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};
