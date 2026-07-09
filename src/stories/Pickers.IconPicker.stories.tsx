import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { IconPicker } from "../components/pickers/IconPicker";

const meta: Meta<typeof IconPicker> = {
  title: "Components/Icon Picker",
  component: IconPicker,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof IconPicker> = {
  render: () => {
    const [i, setI] = React.useState("Rocket");
    return <IconPicker value={i} onChange={setI} />;
  },
};
