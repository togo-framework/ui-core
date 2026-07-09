import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="sources">Sources</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Entity overview content goes here.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="events">
        <Card>
          <CardHeader><CardTitle>Events</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">14 events cross-referenced with this entity.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sources">
        <Card>
          <CardHeader><CardTitle>Sources</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">3 intelligence sources contributing data.</p></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  name: "With Disabled Tab",
  render: () => (
    <Tabs defaultValue="active" className="w-80">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="pt-4 text-sm text-muted-foreground">Active records shown here.</p>
      </TabsContent>
      <TabsContent value="pending">
        <p className="pt-4 text-sm text-muted-foreground">Pending records shown here.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const RTLTabs: Story = {
  name: "RTL Tabs",
  render: () => (
    <div dir="rtl">
      <Tabs defaultValue="overview" className="w-96">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="events">الأحداث</TabsTrigger>
          <TabsTrigger value="sources">المصادر</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>نظرة عامة</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">محتوى نظرة عامة للكيان.</p></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardContent><p className="text-sm text-muted-foreground pt-4">14 حدثاً مرتبطاً بهذا الكيان.</p></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sources">
          <Card>
            <CardContent><p className="text-sm text-muted-foreground pt-4">3 مصادر استخباراتية.</p></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
