
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MoreHorizontal } from "lucide-react";

import { EmailType } from "@/types/email";

interface EmailListProps {
  emails: EmailType[];
  showResponses?: boolean;
}

export const EmailList = ({ emails, showResponses = false }: EmailListProps) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);

  return (
    <div className="space-y-4">
      {emails.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No emails to display</p>
        </div>
      ) : (
        emails.map((email) => (
          <Card 
            key={email.id}
            className={email.unread && !showResponses ? "border-l-4 border-l-blue-500" : ""}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {email.from.name}
                    {email.unread && !showResponses && (
                      <Badge variant="outline" className="ml-2 bg-blue-50">New</Badge>
                    )}
                    {showResponses && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">Auto-responded</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs">{email.from.email}</CardDescription>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">
                    {new Date(email.receivedAt).toLocaleDateString()}
                  </span>
                  <Menubar className="border-none">
                    <MenubarMenu>
                      <MenubarTrigger className="p-1 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </MenubarTrigger>
                      <MenubarContent align="end">
                        <MenubarItem>Mark as read</MenubarItem>
                        <MenubarItem>Disable auto-response</MenubarItem>
                        <MenubarItem>Archive</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <h4 className="font-medium text-sm mb-1">{email.subject}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {email.body}
              </p>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <div className="text-xs text-muted-foreground">
                {showResponses ? (
                  <span>Responded automatically</span>
                ) : (
                  email.hasAutoResponse ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-xs">
                          View auto-response
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Auto-generated response:</h4>
                          <p className="text-sm text-muted-foreground">{email.autoResponse}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <span>Pending analysis</span>
                  )
                )}
              </div>
              <div>
                {!showResponses && (
                  email.hasAutoResponse ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">Responded</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Analyzing</Badge>
                  )
                )}
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
