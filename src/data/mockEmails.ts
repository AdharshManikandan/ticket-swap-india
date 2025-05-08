
import { EmailType } from "@/types/email";

export const mockEmails: EmailType[] = [
  {
    id: "1",
    subject: "Project Update Request",
    body: "Hi there! I wanted to check in on the status of the project. Could you please provide an update on the timeline and any challenges you're facing? Thanks!",
    from: {
      name: "John Smith",
      email: "john.smith@example.com"
    },
    to: "me@example.com",
    receivedAt: "2023-05-06T10:30:00Z",
    unread: true,
    hasAutoResponse: true,
    autoResponse: "Hi John, Thanks for checking in! I'm making good progress on the project. Currently, we're on track with the timeline we discussed. I've completed the initial phase and am working on the second deliverable now. No major challenges to report. I'll send you a detailed update by the end of the week. Best regards, Me"
  },
  {
    id: "2",
    subject: "Meeting Invitation: Strategy Discussion",
    body: "Dear Team, I would like to invite you to a strategy discussion meeting next Tuesday at 2 PM. Please confirm your attendance at your earliest convenience. Regards, Sarah",
    from: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com"
    },
    to: "me@example.com",
    receivedAt: "2023-05-05T14:45:00Z",
    unread: true,
    hasAutoResponse: true,
    autoResponse: "Dear Sarah, Thank you for the invitation to the strategy discussion meeting next Tuesday at 2 PM. I confirm my attendance and look forward to participating in the discussion. Best regards, Me"
  },
  {
    id: "3",
    subject: "Invoice #INV-2023-005",
    body: "Please find attached invoice #INV-2023-005 for services rendered in April 2023. Payment is due within 30 days. Thank you for your business.",
    from: {
      name: "Finance Department",
      email: "finance@acmecorp.com"
    },
    to: "me@example.com",
    receivedAt: "2023-05-04T09:15:00Z",
    unread: false,
    hasAutoResponse: false,
    autoResponse: ""
  },
  {
    id: "4",
    subject: "Quick question about the design",
    body: "Hey! I was looking at the latest design mockups and had a question about the color scheme. Are we set on using that shade of blue for the main buttons? I think a slightly darker tone might work better with the overall palette. Let me know your thoughts!",
    from: {
      name: "Mike Anderson",
      email: "mike.anderson@example.com"
    },
    to: "me@example.com",
    receivedAt: "2023-05-03T16:20:00Z",
    unread: false,
    hasAutoResponse: true,
    autoResponse: "Hey Mike, Good question about the color scheme! I'm not fully set on that particular shade of blue. I think your suggestion of going with a darker tone has merit - it would probably provide better contrast. Let me experiment with some darker shades and I'll send you updated mockups tomorrow. Thanks for the feedback! Cheers, Me"
  },
  {
    id: "5",
    subject: "Reminder: Quarterly Review",
    body: "This is a friendly reminder that your quarterly performance review is scheduled for this Friday at 11 AM. Please prepare a short summary of your achievements and goals for the next quarter.",
    from: {
      name: "HR Department",
      email: "hr@example.com"
    },
    to: "me@example.com",
    receivedAt: "2023-05-02T11:00:00Z",
    unread: false,
    hasAutoResponse: false,
    autoResponse: ""
  }
];
