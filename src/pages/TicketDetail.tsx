
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockTickets } from "@/data/mockData";
import { Ticket, TicketStatus } from "@/types/ticket";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import TicketHeader from "@/components/ticket/TicketHeader";
import JourneyDetails from "@/components/ticket/JourneyDetails";
import TicketInformation from "@/components/ticket/TicketInformation";
import TicketStatus from "@/components/ticket/TicketStatus";
import PurchaseDialog from "@/components/ticket/PurchaseDialog";
import SimilarTickets from "@/components/ticket/SimilarTickets";
import Loading from "@/components/ticket/Loading";
import NotFound from "@/components/ticket/NotFound";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, just simulate a fetch with timeout
    setTimeout(() => {
      const foundTicket = mockTickets.find((t) => t.id === id);
      setTicket(foundTicket || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handlePurchase = () => {
    if (!buyerName || !buyerEmail || !buyerPhone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Update ticket status
    if (ticket) {
      const updatedTicket = { ...ticket, status: TicketStatus.SOLD };
      const index = mockTickets.findIndex((t) => t.id === ticket.id);
      if (index !== -1) {
        mockTickets[index] = updatedTicket;
      }
      
      setDialogOpen(false);
      
      // Show success message
      toast({
        title: "Ticket Purchased!",
        description: "You have successfully purchased this ticket.",
      });
      
      // In a real app, we would redirect to a purchase confirmation page
      // For now, let's just update the state
      setTicket(updatedTicket);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <Loading />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/browse" className="text-brand-700 hover:underline flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to All Tickets
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {/* Ticket Header */}
            <TicketHeader ticket={ticket} />

            {/* Ticket Details */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <JourneyDetails ticket={ticket} />
              <TicketInformation ticket={ticket} />
              <TicketStatus 
                ticket={ticket} 
                onPurchaseClick={() => setDialogOpen(true)} 
              />
            </div>
          </div>

          <SimilarTickets currentTicket={ticket} allTickets={mockTickets} />

          <PurchaseDialog
            ticket={ticket}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            buyerName={buyerName}
            setBuyerName={setBuyerName}
            buyerEmail={buyerEmail}
            setBuyerEmail={setBuyerEmail}
            buyerPhone={buyerPhone}
            setBuyerPhone={setBuyerPhone}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
