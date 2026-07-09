import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../components/ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-10 w-64" />,
};

export const CardSkeleton: Story = {
  name: "Card Loading State",
  render: () => (
    <div className="space-y-3 w-80 p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  name: "Table Loading State",
  render: () => (
    <div className="space-y-2 w-[480px]">
      <div className="flex gap-4">
        {[120, 180, 100, 80].map((w, i) => (
          <Skeleton key={i} className="h-4" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="flex gap-4">
          {[120, 180, 100, 80].map((w, i) => (
            <Skeleton key={i} className="h-3" style={{ width: w - 10 * row }} />
          ))}
        </div>
      ))}
    </div>
  ),
};
