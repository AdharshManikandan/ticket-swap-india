
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  emailProvider: z.string().min(1, "Please select an email provider"),
  emailAddress: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface ConnectEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export const ConnectEmailDialog = ({ open, onOpenChange, onConnect }: ConnectEmailDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailProvider: "",
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Connecting to email:", data);
    
    // This would be where we'd handle the email authentication
    // For this prototype, we'll just simulate a successful connection
    setTimeout(() => {
      onConnect();
    }, 1500);
  };

  const providers = [
    { value: "gmail", label: "Gmail" },
    { value: "outlook", label: "Outlook" },
    { value: "yahoo", label: "Yahoo Mail" },
    { value: "other", label: "Other (IMAP)" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Email Account</DialogTitle>
          <DialogDescription>
            Connect your email account to start automating responses
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Provider</FormLabel>
                  <DropdownMenu>
                    <FormControl>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {field.value ? 
                            providers.find(provider => provider.value === field.value)?.label : 
                            "Select provider"}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                    </FormControl>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      {providers.map((provider) => (
                        <DropdownMenuItem
                          key={provider.value}
                          onClick={() => {
                            form.setValue("emailProvider", provider.value);
                          }}
                        >
                          {provider.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password or App Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="w-full">
                Connect Account
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-xs text-muted-foreground mt-4">
          <p>
            Note: For Gmail and other providers that use 2-factor authentication,
            you'll need to use an app password instead of your regular password.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
