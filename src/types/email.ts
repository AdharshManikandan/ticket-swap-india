
export interface EmailContact {
  name: string;
  email: string;
}

export interface EmailType {
  id: string;
  subject: string;
  body: string;
  from: EmailContact;
  to: string;
  receivedAt: string;
  unread: boolean;
  hasAutoResponse: boolean;
  autoResponse: string;
}
