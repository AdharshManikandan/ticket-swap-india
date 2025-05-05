
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Ticket, TicketType } from "@/types/ticket";
import { format, parse } from "date-fns";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  // Format the date for display
  const formattedDate = format(
    parse(ticket.departureDate, "yyyy-MM-dd", new Date()),
    "dd MMM yyyy"
  );

  const getTicketTypeIcon = () => {
    switch (ticket.type) {
      case TicketType.TRAIN:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 11a6 6 0 0 1 12 0v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <path d="M7 11h10" />
            <path d="M10 17v-3" />
            <path d="M14 17v-3" />
          </svg>
        );
      case TicketType.BUS:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 17h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1" />
            <path d="M3 17h2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4" />
            <path d="M16 2H8a4 4 0 0 0-4 4v10h16V6a4 4 0 0 0-4-4Z" />
            <path d="M4 13h16" />
            <path d="M8 2v11" />
            <path d="M16 2v11" />
          </svg>
        );
      case TicketType.FLIGHT:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4"
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
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={`/ticket/${ticket.id}`} className="block p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="flex items-center gap-1 font-medium">
            {getTicketTypeIcon()}
            <span>{ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}</span>
          </Badge>
          <div className="flex items-center">
            <div className="font-medium text-accent-600">₹{ticket.sellingPrice}</div>
            {ticket.originalPrice > ticket.sellingPrice && (
              <div className="text-xs text-gray-500 line-through ml-2">₹{ticket.originalPrice}</div>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{ticket.from}</h3>
            <span className="font-semibold">{ticket.to}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex-1 h-px bg-gray-200"></div>
            <ArrowRight className="h-3 w-3 mx-2" />
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>{ticket.departureTime}</span>
          </div>
          
          {ticket.transportCompany && (
            <div className="text-gray-600">{ticket.transportCompany}</div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
      </Link>
    </div>
  );
};

export default TicketCard;
