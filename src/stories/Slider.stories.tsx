import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../components/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: { defaultValue: [50], min: 0, max: 100, step: 1 },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => <Slider {...args} className="w-64" aria-label="Value" />,
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: [30] },
  render: (args) => <Slider {...args} className="w-64" aria-label="Disabled value" />,
};

export const ConfidenceScore: Story = {
  name: "Confidence Score",
  render: () => (
    <div className="space-y-2 w-64">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Confidence</span>
        <span>75%</span>
      </div>
      <Slider defaultValue={[75]} aria-label="Confidence score" />
    </div>
  ),
};
