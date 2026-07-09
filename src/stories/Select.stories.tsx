import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

const meta: Meta = {
  title: "Components/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select scope..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="iran">Iran</SelectItem>
        <SelectItem value="russia">Russia</SelectItem>
        <SelectItem value="china">China</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  name: "Grouped Options",
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <Label>Region Scope</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select region..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Middle East</SelectLabel>
              <SelectItem value="iran">Iran</SelectItem>
              <SelectItem value="iraq">Iraq</SelectItem>
              <SelectItem value="syria">Syria</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Eurasia</SelectLabel>
              <SelectItem value="russia">Russia</SelectItem>
              <SelectItem value="ukraine">Ukraine</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Locked scope" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="locked">Locked</SelectItem>
      </SelectContent>
    </Select>
  ),
};
