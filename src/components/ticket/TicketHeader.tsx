
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketType } from "@/types/ticket";
import { ArrowRight, Train, Bus } from "lucide-react";

interface TicketHeaderProps {
  ticket: Ticket;
}

const TicketHeader = ({ ticket }: TicketHeaderProps) => {
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
  );
};

export default TicketHeader;
