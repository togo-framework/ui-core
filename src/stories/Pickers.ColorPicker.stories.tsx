import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColorPicker } from "../components/pickers/ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/Color Picker",
  component: ColorPicker,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof ColorPicker> = {
  render: () => {
    const [c, setC] = React.useState("#7c3aed");
    return <ColorPicker value={c} onChange={setC} />;
  },
};
