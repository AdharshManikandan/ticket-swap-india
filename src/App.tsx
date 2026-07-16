
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import TicketDetail from "@/pages/TicketDetail";
import ListTicket from "@/pages/ListTicket";
import NotFound from "@/pages/NotFound";
import EmailDashboard from "@/pages/EmailDashboard";
import { Toaster } from "@/components/ui/sonner";

import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path="/list-ticket" element={<ListTicket />} />
        <Route path="/email-dashboard" element={<EmailDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
