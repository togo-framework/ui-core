import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Search, Plus, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {};

// ── Variant matrix ───────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// ── Size matrix ───────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Search">
        <Search />
      </Button>
    </div>
  ),
};

// ── Disabled state ────────────────────────────────────────────────────────────
export const DisabledStates: Story = {
  name: "Disabled States",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default" disabled>Default</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="secondary" disabled>Secondary</Button>
    </div>
  ),
};

// ── With icon ─────────────────────────────────────────────────────────────────
export const WithIcon: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button>
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
      <Button variant="outline">
        <Search className="w-4 h-4" />
        Search
      </Button>
      <Button variant="secondary" disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ),
};

// ── Interaction test: click fires handler ─────────────────────────────────────
export const ClickInteraction: Story = {
  name: "Click Interaction (play fn)",
  args: {
    children: "Click me",
    variant: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
  },
};

// ── Destructive ───────────────────────────────────────────────────────────────
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete Record" },
};
