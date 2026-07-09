import type { Meta, StoryObj } from "@storybook/react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "../components/ui/sonner";
import { Button } from "../components/ui/button";

const meta: Meta = {
  title: "Components/Sonner (Toast)",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <SonnerToaster richColors position="bottom-right" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button onClick={() => sonnerToast("Operation complete")}>
      Show Toast
    </Button>
  ),
};

export const AllTypes: Story = {
  name: "All Toast Types",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => sonnerToast("Default notification")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => sonnerToast.success("Record saved successfully")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => sonnerToast.error("Failed to submit report")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => sonnerToast.warning("Data source reliability degraded")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => sonnerToast.info("Scheduled maintenance tonight")}>
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          sonnerToast.promise(new Promise((r) => setTimeout(r, 2000)), {
            loading: "Processing...",
            success: "Done!",
            error: "Failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  ),
};
