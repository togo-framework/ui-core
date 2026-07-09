import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Intelligence Summary</CardTitle>
        <CardDescription>Threat assessment for Q2 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Key indicators show a 23% increase in digital threat vectors across monitored regions.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">View Report</Button>
        <Button size="sm" variant="outline">Archive</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  name: "With Status Badge",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Entity Profile</CardTitle>
          <Badge variant="destructive">High Risk</Badge>
        </div>
        <CardDescription>ID: ENT-2026-0042</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Cross-referenced with 14 events. Last activity detected 2h ago.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card className="w-80 p-4">
      <p className="text-sm text-foreground">A minimal card with direct content.</p>
    </Card>
  ),
};

export const GridLayout: Story = {
  name: "Card Grid",
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[640px]">
      {["Events", "Entities", "Narratives", "Sources"].map((label) => (
        <Card key={label}>
          <CardHeader>
            <CardTitle className="text-lg">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {Math.floor(Math.random() * 500 + 100)}
            </p>
            <p className="text-xs text-muted-foreground">Total records</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
