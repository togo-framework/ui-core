/**
 * Form — example form using react-hook-form + zod, demonstrating
 * Form, FormField, FormItem, FormLabel, FormControl, FormMessage integration.
 * Includes an interaction test (play fn) that fills and submits the form.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";

const meta: Meta = {
  title: "Components/Form",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

// ── Simple sign-in form ───────────────────────────────────────────────────────
function SignInForm() {
  const form = useForm({ defaultValues: { email: "", password: "" } });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="space-y-4 w-80"
        aria-label="Sign In form"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="operator@sentra.gov" {...field} />
              </FormControl>
              <FormDescription>Use your organization email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </Form>
  );
}

export const SignIn: Story = {
  name: "Sign-In Form",
  render: () => <SignInForm />,
};

// ── Interaction test: fill and submit ─────────────────────────────────────────
export const FillAndSubmit: Story = {
  name: "Fill and Submit (play fn)",
  render: () => <SignInForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText(/operator@sentra\.gov/i);
    const passwordInput = canvas.getByPlaceholderText(/•+/);
    const submitButton = canvas.getByRole("button", { name: /sign in/i });

    await userEvent.click(emailInput);
    await userEvent.type(emailInput, "admin@sentra.gov");
    await expect(emailInput).toHaveValue("admin@sentra.gov");

    await userEvent.click(passwordInput);
    await userEvent.type(passwordInput, "SecurePass123!");
    await expect(passwordInput).toHaveValue("SecurePass123!");

    await userEvent.click(submitButton);
    await expect(submitButton).toBeInTheDocument();
  },
};

// ── Entity creation form ──────────────────────────────────────────────────────
function EntityForm() {
  const form = useForm({
    defaultValues: { name_en: "", name_ar: "", type: "", active: false },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="space-y-4 w-96"
        aria-label="Create Entity form"
      >
        <FormField
          control={form.control}
          name="name_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (English)</FormLabel>
              <FormControl>
                <Input placeholder="Entity name in English" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (Arabic)</FormLabel>
              <FormControl>
                <Input placeholder="اسم الكيان بالعربية" dir="rtl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="entity-active"
                />
              </FormControl>
              <div>
                <FormLabel htmlFor="entity-active">Active tracking</FormLabel>
                <FormDescription>Enable real-time monitoring for this entity.</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" className="flex-1">Cancel</Button>
          <Button type="submit" className="flex-1">Create Entity</Button>
        </div>
      </form>
    </Form>
  );
}

export const EntityCreation: Story = {
  name: "Entity Creation Form",
  render: () => <EntityForm />,
};
