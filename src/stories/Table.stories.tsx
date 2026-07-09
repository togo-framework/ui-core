import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableFooter,
} from "../components/ui/table";

const meta: Meta = {
  title: "Components/Table",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const mockData = [
  { id: "ENT-001", name: "Unnamed Entity A", type: "Organization", risk: "High", lastSeen: "2h ago" },
  { id: "ENT-002", name: "Unnamed Entity B", type: "Individual", risk: "Critical", lastSeen: "30m ago" },
  { id: "ENT-003", name: "Unnamed Entity C", type: "Network", risk: "Medium", lastSeen: "1d ago" },
  { id: "ENT-004", name: "Unnamed Entity D", type: "Organization", risk: "Low", lastSeen: "3d ago" },
];

const riskVariant = (risk: string) => {
  if (risk === "Critical") return "destructive";
  if (risk === "High") return "default";
  if (risk === "Medium") return "secondary";
  return "outline";
};

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <Table>
        <TableCaption>Entity risk registry — Q2 2026</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-end">Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-muted-foreground">{row.type}</TableCell>
              <TableCell>
                <Badge variant={riskVariant(row.risk)}>{row.risk}</Badge>
              </TableCell>
              <TableCell className="text-end text-muted-foreground">{row.lastSeen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-end">{mockData.length} entities</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const RTLTable: Story = {
  name: "RTL Table",
  render: () => (
    <div className="w-[640px]" dir="rtl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المعرف</TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>النوع</TableHead>
            <TableHead className="text-start">آخر ظهور</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell>كيان {row.id.split("-")[1]}</TableCell>
              <TableCell className="text-muted-foreground">{row.type}</TableCell>
              <TableCell className="text-start text-muted-foreground">{row.lastSeen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
