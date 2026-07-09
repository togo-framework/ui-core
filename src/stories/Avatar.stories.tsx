import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  name: "Fallback Initials",
  render: () => (
    <div className="flex gap-3">
      {["SA", "MK", "RA", "عم"].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: "Size Variants (CSS)",
  render: () => (
    <div className="flex gap-4 items-end">
      {(["h-6 w-6", "h-8 w-8", "h-10 w-10", "h-12 w-12", "h-16 w-16"] as const).map((size) => (
        <Avatar key={size} className={size}>
          <AvatarFallback className="text-xs">SA</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
