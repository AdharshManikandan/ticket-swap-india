
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EmailList } from "@/components/email/EmailList";
import { SettingsPanel } from "@/components/email/SettingsPanel";
import { ConnectEmailDialog } from "@/components/email/ConnectEmailDialog";
import { mockEmails } from "@/data/mockEmails";

const formSchema = z.object({
  emailAddress: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const EmailDashboard = () => {
  const [emails, setEmails] = useState(mockEmails);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  
  const handleConnect = () => {
    setShowConnectDialog(true);
  };
  
  const handleEmailConnected = () => {
    setIsConnected(true);
    setShowConnectDialog(false);
    toast.success("Email connected successfully!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email AutoResponder</h1>
          <p className="text-muted-foreground mt-2">Automate your email responses with AI</p>
        </div>
        
        {!isConnected ? (
          <Button onClick={handleConnect} className="mt-4 md:mt-0">
            Connect Email Account
          </Button>
        ) : (
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="text-sm text-muted-foreground">Connected to email@example.com</p>
          </div>
        )}
      </div>

      {isConnected ? (
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="automated">Automated Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbox">
            <Card>
              <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>
                  Monitor incoming emails and manage auto-responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmailList emails={emails} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automated">
            <Card>
              <CardHeader>
                <CardTitle>Automated Responses</CardTitle>
                <CardDescription>
                  View and manage all automatically generated responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmailList 
                  emails={emails.filter(email => email.hasAutoResponse)} 
                  showResponses
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Connect your email account to start automating responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="h-12 w-12 text-muted-foreground mb-4"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="16" rx="2" width="20" x="2" y="4" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <h3 className="text-lg font-medium">No email account connected</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-6">
                Connect your email account to start monitoring incoming emails and generating automated responses.
              </p>
              <Button onClick={handleConnect}>Connect Email Account</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ConnectEmailDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        onConnect={handleEmailConnected}
      />
    </div>
  );
};

export default EmailDashboard;
