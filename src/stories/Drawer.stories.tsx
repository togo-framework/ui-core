import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";

const meta: Meta = {
  title: "Components/Drawer",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerDescription>Select an action to perform on this record.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2 space-y-2">
          <Button variant="outline" className="w-full justify-start">Archive Record</Button>
          <Button variant="outline" className="w-full justify-start">Export to PDF</Button>
          <Button variant="outline" className="w-full justify-start">Share with Team</Button>
          <Button variant="destructive" className="w-full justify-start">Delete</Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
