import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="medium">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="low" id="r-low" />
        <Label htmlFor="r-low">Low</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="medium" id="r-medium" />
        <Label htmlFor="r-medium">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="high" id="r-high" />
        <Label htmlFor="r-high">High</Label>
      </div>
    </RadioGroup>
  ),
};

export const ThreatLevel: Story = {
  name: "Threat Level Selector",
  render: () => (
    <RadioGroup defaultValue="high">
      {["Critical", "High", "Medium", "Low"].map((level) => (
        <div key={level} className="flex items-center gap-2">
          <RadioGroupItem value={level.toLowerCase()} id={`threat-${level}`} />
          <Label htmlFor={`threat-${level}`}>{level}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
