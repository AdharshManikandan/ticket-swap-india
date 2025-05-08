
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

const settingsFormSchema = z.object({
  autoRespond: z.boolean().default(true),
  respondToUnknown: z.boolean().default(false),
  responseDelay: z.number().min(0).max(10),
  signature: z.string().optional(),
  keywordsToIgnore: z.string().optional(),
  tonePriority: z.number().min(0).max(100),
});

export const SettingsPanel = () => {
  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      autoRespond: true,
      respondToUnknown: false,
      responseDelay: 2,
      signature: "Best regards,\nYour Name",
      keywordsToIgnore: "newsletter, no-reply, unsubscribe",
      tonePriority: 80,
    },
  });

  const onSubmit = (data: z.infer<typeof settingsFormSchema>) => {
    console.log("Settings saved:", data);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Response Settings</CardTitle>
          <CardDescription>
            Configure how the auto-responder analyzes and responds to emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="autoRespond"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Automatic Responses</FormLabel>
                        <FormDescription>
                          Enable or disable automatic email responses
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="respondToUnknown"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Respond to Unknown Senders</FormLabel>
                        <FormDescription>
                          Generate responses for emails from unknown contacts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responseDelay"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0.5">
                        <FormLabel>Response Delay (minutes)</FormLabel>
                        <FormDescription>
                          Add a delay before sending the automated response
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="pt-2">
                          <Slider
                            value={[field.value]}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>0 min</span>
                            <span>{field.value} min</span>
                            <span>10 min</span>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tonePriority"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0.5">
                        <FormLabel>Tone Matching Priority</FormLabel>
                        <FormDescription>
                          How closely should responses match the sender's tone
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="pt-2">
                          <Slider
                            value={[field.value]}
                            min={0}
                            max={100}
                            step={10}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Formal</span>
                            <span>Match sender</span>
                            <span>Casual</span>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Signature</FormLabel>
                      <FormDescription>
                        Custom signature to append to all auto-responses
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Best regards,\nYour Name"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywordsToIgnore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords to Ignore</FormLabel>
                      <FormDescription>
                        Skip auto-responses for emails containing these keywords (comma-separated)
                      </FormDescription>
                      <FormControl>
                        <Input placeholder="newsletter, no-reply, unsubscribe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Account</CardTitle>
          <CardDescription>
            Manage your connected email accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <h4 className="font-medium">email@example.com</h4>
                <p className="text-sm text-muted-foreground">Primary account</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline">Disconnect</Button>
              <Button>Add Another Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
