import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { AlertTriangle, Info, CheckCircle, ShieldAlert } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Your session will expire in 30 minutes. Save your work to avoid data loss.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>System Notice</AlertTitle>
        <AlertDescription>Scheduled maintenance tonight 00:00–02:00 UTC.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Security Alert</AlertTitle>
        <AlertDescription>Unauthorized access attempt detected from IP 192.168.1.105.</AlertDescription>
      </Alert>
      <Alert className="border-success/40 text-success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Intelligence report submitted successfully.</AlertDescription>
      </Alert>
      <Alert className="border-warning/40 text-warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Data source reliability has degraded to C3.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const RTLAlert: Story = {
  name: "RTL Alert",
  render: () => (
    <div dir="rtl" className="w-96">
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>تنبيه أمني</AlertTitle>
        <AlertDescription>تم رصد محاولة وصول غير مصرح بها.</AlertDescription>
      </Alert>
    </div>
  ),
};
