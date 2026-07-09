import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "../components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle bold"><Bold className="w-4 h-4" /></Toggle>,
};

export const FormatGroup: Story = {
  name: "ToggleGroup — Text Formatting",
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="w-4 h-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="w-4 h-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="w-4 h-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const AlignmentGroup: Story = {
  name: "ToggleGroup — Alignment (single)",
  render: () => (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Left"><AlignLeft className="w-4 h-4" /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center"><AlignCenter className="w-4 h-4" /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right"><AlignRight className="w-4 h-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};
