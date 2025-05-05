
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockTickets } from "@/data/mockData";
import { Ticket, TicketStatus, TicketType } from "@/types/ticket";
import { format, parse } from "date-fns";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Clock,
  Train,
  Bus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Ticket Not Found</h1>
          <p className="text-gray-600 mb-8">
            The ticket you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/browse">Browse Available Tickets</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Format the date
  const formattedDate = format(
    parse(ticket.departureDate, "yyyy-MM-dd", new Date()),
    "EEEE, MMMM d, yyyy"
  );

  const getTicketTypeIcon = () => {
    switch (ticket.type) {
      case TicketType.TRAIN:
        return <Train className="h-5 w-5" />;
      case TicketType.BUS:
        return <Bus className="h-5 w-5" />;
      case TicketType.FLIGHT:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M17.8 19.2L16 11l3.5-7.8a2.1 2.1 0 0 0-1.5-2.8 1.9 1.9 0 0 0-2.5 1.3L11 11l-5 3-2-1-2 3 4 2 9 2 6-2a2.1 2.1 0 0 0 1.3-2.7 2.1 2.1 0 0 0-3.5-.1Z" />
          </svg>
        );
    }
  };

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
            <div className="p-6 md:p-8 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="font-medium">
                      {getTicketTypeIcon()}
                      <span className="ml-1">
                        {ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)} Ticket
                      </span>
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      {ticket.transportCompany || "Transport"}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {ticket.from} <ArrowRight className="h-5 w-5 text-gray-400" /> {ticket.to}
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">Original Price: ₹{ticket.originalPrice}</div>
                  <div className="text-2xl font-bold text-accent-600">₹{ticket.sellingPrice}</div>
                  <div className="text-sm text-green-600">
                    Save ₹{ticket.originalPrice - ticket.sellingPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div>
                <h2 className="text-sm uppercase text-gray-500 font-medium mb-2">Journey Details</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 text-brand-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{formattedDate}</p>
                      <p className="text-sm text-gray-600">Departure Date</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-brand-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{ticket.departureTime} - {ticket.arrivalTime}</p>
                      <p className="text-sm text-gray-600">Departure - Arrival Time</p>
                    </div>
                  </div>
                  {ticket.class && (
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div>
                        <p className="font-medium">{ticket.class}</p>
                        <p className="text-sm text-gray-600">Class/Category</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase text-gray-500 font-medium mb-2">Ticket Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <div>
                      <p className="font-medium">{ticket.pnr}</p>
                      <p className="text-sm text-gray-600">PNR / Booking Reference</p>
                    </div>
                  </div>
                  {ticket.seatNumber && (
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <div>
                        <p className="font-medium">{ticket.seatNumber}</p>
                        <p className="text-sm text-gray-600">Seat Number</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="font-medium">{ticket.seller}</p>
                      <p className="text-sm text-gray-600">Seller</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase text-gray-500 font-medium mb-2">Status & Description</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    {ticket.status === TicketStatus.AVAILABLE ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {ticket.status === TicketStatus.AVAILABLE
                          ? "Available"
                          : "Sold"}
                      </p>
                      <p className="text-sm text-gray-600">Status</p>
                    </div>
                  </div>
                </div>

                {ticket.description && (
                  <>
                    <h3 className="font-medium mb-2">Description:</h3>
                    <p className="text-gray-700">{ticket.description}</p>
                  </>
                )}

                <div className="mt-6">
                  {ticket.status === TicketStatus.AVAILABLE ? (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full md:w-auto">
                          Purchase This Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Purchase Ticket</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-sm">
                              <span className="font-medium">From:</span> {ticket.from}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">To:</span> {ticket.to}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Date:</span> {formattedDate}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Time:</span> {ticket.departureTime}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={buyerEmail}
                                onChange={(e) => setBuyerEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                value={buyerPhone}
                                onChange={(e) => setBuyerPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                              />
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total Price:</span>
                            <span className="text-lg">₹{ticket.sellingPrice}</span>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handlePurchase}>
                            Confirm Purchase
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex items-center justify-center bg-red-50 text-red-700 p-3 rounded-md">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>This ticket has been sold</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Similar Tickets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockTickets
                .filter(
                  (t) =>
                    t.id !== ticket.id &&
                    (t.from === ticket.from || t.to === ticket.to) &&
                    t.status === TicketStatus.AVAILABLE
                )
                .slice(0, 3)
                .map((t) => (
                  <TicketCard key={t.id} ticket={t} />
                ))}
            </div>
            {mockTickets.filter(
              (t) =>
                t.id !== ticket.id &&
                (t.from === ticket.from || t.to === ticket.to) &&
                t.status === TicketStatus.AVAILABLE
            ).length === 0 && (
              <p className="text-gray-500 my-8">No similar tickets found at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
