import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const events = Array.from({ length: 20 }, (_, i) => ({
  id: `EVT-${String(i + 1).padStart(3, "0")}`,
  title: `Intelligence Event ${i + 1}`,
}));

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-60 w-72 rounded-md border p-4">
      <h4 className="mb-4 text-sm font-medium">Recent Events</h4>
      {events.map((event, i) => (
        <div key={event.id}>
          <div className="text-sm py-2">
            <span className="font-mono text-xs text-muted-foreground me-2">{event.id}</span>
            {event.title}
          </div>
          {i < events.length - 1 && <Separator />}
        </div>
      ))}
    </ScrollArea>
  ),
};
