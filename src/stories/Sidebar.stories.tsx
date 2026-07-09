import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarInset,
} from "../components/ui/sidebar";
import { LayoutDashboard, Users, AlertTriangle, FileText, Settings, Shield } from "lucide-react";
import { Badge } from "../components/ui/badge";

const meta: Meta = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
  // fullBleed removes the canvas padding so the Sidebar's fixed positioning aligns
  // with the top/edge instead of overlapping the inset header.
  parameters: { layout: "fullscreen", fullBleed: true, docs: { story: { inline: false, height: "560px" } } },
};

export default meta;
type Story = StoryObj;

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", badge: null },
  { icon: AlertTriangle, label: "Events", badge: "14" },
  { icon: Users, label: "Entities", badge: null },
  { icon: FileText, label: "Narratives", badge: null },
  { icon: Shield, label: "Intelligence", badge: "3" },
];

export const Default: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <span className="font-semibold text-sidebar-foreground text-sm">Sentra Hub</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Intelligence</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ icon: Icon, label, badge }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton tooltip={label}>
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                      {badge && (
                        <Badge variant="secondary" className="ms-auto text-2xs py-0 px-1.5">
                          {badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-2 p-4 border-b border-border">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <main className="p-8 text-muted-foreground text-sm">
          Main content area — switch the Direction toggle to RTL to verify layout.
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Collapsed: Story = {
  name: "Collapsed (icon-only)",
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <span className="font-semibold text-sidebar-foreground text-sm">SH</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ icon: Icon, label }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton tooltip={label}>
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-2 p-4 border-b border-border">
          <SidebarTrigger />
        </header>
        <main className="p-8 text-muted-foreground text-sm">Icon-only sidebar mode.</main>
      </SidebarInset>
    </SidebarProvider>
  ),
};
