import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter value...",
    type: "text",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div>
        <Label htmlFor="input-default">Default</Label>
        <Input id="input-default" placeholder="Enter value..." />
      </div>
      <div>
        <Label htmlFor="input-filled">Filled</Label>
        <Input id="input-filled" defaultValue="موسى الكاظمي" />
      </div>
      <div>
        <Label htmlFor="input-disabled">Disabled</Label>
        <Input id="input-disabled" placeholder="Cannot edit" disabled />
      </div>
      <div>
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" placeholder="operator@sentra.gov" />
      </div>
      <div>
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" type="password" placeholder="••••••••" />
      </div>
    </div>
  ),
};

export const WithSearchIcon: Story = {
  name: "Search Input",
  render: () => (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input className="pl-9" placeholder="Search entities..." type="search" />
    </div>
  ),
};

export const RTLInput: Story = {
  name: "RTL — Arabic",
  render: () => (
    <div className="flex flex-col gap-4 w-72" dir="rtl">
      <div>
        <Label htmlFor="input-ar">الاسم</Label>
        <Input id="input-ar" placeholder="أدخل الاسم..." dir="rtl" />
      </div>
      <div>
        <Label htmlFor="input-ar-filled">القيمة</Label>
        <Input id="input-ar-filled" defaultValue="مثال على النص العربي" dir="rtl" />
      </div>
    </div>
  ),
};

// Interaction: type into input
export const TypeInteraction: Story = {
  name: "Typing Interaction (play fn)",
  args: { placeholder: "Type here...", id: "test-input" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "Sentra 2026");
    await expect(input).toHaveValue("Sentra 2026");
  },
};
