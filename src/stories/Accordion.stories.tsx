import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Entity Background</AccordionTrigger>
        <AccordionContent>
          Background intelligence on the entity including known affiliations and historical activity.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Threat Assessment</AccordionTrigger>
        <AccordionContent>
          Current threat level is assessed at HIGH based on 14 cross-referenced events.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Source Reliability</AccordionTrigger>
        <AccordionContent>
          Primary source rated B2. Secondary source rated C3. Cross-validated on 3 separate occasions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "Multiple Open",
  render: () => (
    <Accordion type="multiple" className="w-80">
      <AccordionItem value="overview">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>Overview content visible alongside others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="analysis">
        <AccordionTrigger>Analysis</AccordionTrigger>
        <AccordionContent>Analytical findings from intelligence sources.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
