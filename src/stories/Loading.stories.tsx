import type { Meta, StoryObj } from "@storybook/react";
import SentraLoading from "../components/ui/sentra-loading";
import { Skeleton } from "../components/ui/skeleton";

const meta: Meta = { title: "Components/Loading", tags: ["autodocs"] };
export default meta;

export const Spinner: StoryObj = { render: () => <SentraLoading /> };

export const Skeletons: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-3">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  ),
};
