import type { Meta, StoryObj } from "@storybook/react";
import { DirectionalArrow } from "../components/ui/directional-arrow";
import { Button } from "../components/ui/button";

const meta: Meta<typeof DirectionalArrow> = {
  title: "Components/Directional Arrow",
  component: DirectionalArrow,
  tags: ["autodocs"],
  argTypes: {
    isRTL: { control: "boolean" },
    size: { control: { type: "range", min: 12, max: 48, step: 2 } },
  },
  args: {
    isRTL: false,
    size: 16,
  },
};

export default meta;
type Story = StoryObj<typeof DirectionalArrow>;

export const Default: Story = {};

export const RTLMode: Story = {
  name: "RTL Mode",
  args: { isRTL: true },
};

export const LTRvsRTL: Story = {
  name: "LTR vs RTL Side by Side",
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <DirectionalArrow isRTL={false} size={24} />
        <span className="text-xs text-muted-foreground">LTR (→)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DirectionalArrow isRTL={true} size={24} />
        <span className="text-xs text-muted-foreground">RTL (←)</span>
      </div>
    </div>
  ),
};

export const InButtonContext: Story = {
  name: "In Button Context",
  render: () => (
    <div className="flex gap-4">
      <Button>
        Continue <DirectionalArrow isRTL={false} />
      </Button>
      <Button variant="outline" dir="rtl">
        <DirectionalArrow isRTL={true} />
        متابعة
      </Button>
    </div>
  ),
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div className="flex gap-4 items-center">
      {[12, 16, 20, 24, 32].map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <DirectionalArrow size={s} />
          <span className="text-2xs text-muted-foreground">{s}px</span>
        </div>
      ))}
    </div>
  ),
};
