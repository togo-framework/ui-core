import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: { value: 60 },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-80" />,
};

export const AllValues: Story = {
  name: "Progress Values",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Processing</span>
            <span>{v}%</span>
          </div>
          <Progress value={v} />
        </div>
      ))}
    </div>
  ),
};
