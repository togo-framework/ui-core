import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { MoreHorizontal, User, Settings, LogOut, Download } from "lucide-react";

const meta: Meta = {
  title: "Components/DropdownMenu",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        <DropdownMenuItem>Edit Entity</DropdownMenuItem>
        <DropdownMenuItem>Export Data</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSubMenu: Story = {
  name: "With Submenu",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export As</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  name: "With Checkboxes",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Entity Name</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Risk Level</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Last Seen</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Source Count</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// Leading-icon items in LTR — icons sit on the LEFT (start) of each row.
export const WithIcons: Story = {
  name: "With leading icons (LTR)",
  render: () => (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="gap-2"><User className="h-4 w-4" />Profile</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Settings className="h-4 w-4" />Settings</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" />Export</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="h-4 w-4" />Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// The same menu in RTL — dir on the Root flips the row layout so the leading
// icons sit on the RIGHT (start) side, the way an Arabic menu should read.
// This is the fix for "dropdown comes with left icons in RTL".
export const WithIconsRTL: Story = {
  name: "With leading icons — Arabic / RTL",
  render: () => (
    <div dir="rtl">
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem className="gap-2"><User className="h-4 w-4" />الملف الشخصي</DropdownMenuItem>
          <DropdownMenuItem className="gap-2"><Settings className="h-4 w-4" />الإعدادات</DropdownMenuItem>
          <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" />تصدير</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="h-4 w-4" />تسجيل الخروج</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
