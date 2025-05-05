
import { Link } from "react-router-dom";
import { Ticket, TicketType } from "../types/ticket";
import { formatDistanceToNow } from "date-fns";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Train, Bus, Calendar } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  // Format the date
  const formattedDate = format(
    parse(ticket.departureDate, "yyyy-MM-dd", new Date()),
    "EEE, MMM d, yyyy"
  );

  // Calculate time since listing
  const timeSinceListing = formatDistanceToNow(
    new Date(ticket.listedDate),
    { addSuffix: true }
  );

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            {ticket.type === TicketType.TRAIN && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Train className="h-3 w-3 mr-1" /> Train
              </Badge>
            )}
            {ticket.type === TicketType.BUS && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Bus className="h-3 w-3 mr-1" /> Bus
              </Badge>
            )}
            {ticket.type === TicketType.FLIGHT && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 mr-1"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2L16 11l3.5-7.8a2.1 2.1 0 0 0-1.5-2.8 1.9 1.9 0 0 0-2.5 1.3L11 11l-5 3-2-1-2 3 4 2 9 2 6-2a2.1 2.1 0 0 0 1.3-2.7 2.1 2.1 0 0 0-3.5-.1Z" />
                </svg>
                Flight
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" /> {formattedDate}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-heading text-lg font-semibold">{ticket.from}</span>
            <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="font-heading text-lg font-semibold">{ticket.to}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Original ₹{ticket.originalPrice}</span>
          <span className="text-xl font-bold text-accent-600">₹{ticket.sellingPrice}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-3">
        <div className="flex justify-between text-sm mb-2">
          <div className="flex flex-col">
            <span className="font-semibold">{ticket.departureTime}</span>
            <span className="text-muted-foreground text-xs">Departure</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{ticket.arrivalTime}</span>
            <span className="text-muted-foreground text-xs">Arrival</span>
          </div>
          {ticket.class && (
            <div className="flex flex-col">
              <span className="font-semibold">{ticket.class}</span>
              <span className="text-muted-foreground text-xs">Class</span>
            </div>
          )}
        </div>
        
        <div className="text-sm mt-2">
          <p className="text-muted-foreground line-clamp-2">
            {ticket.description || `Ticket for ${ticket.transportCompany}`}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Listed {timeSinceListing}
        </div>
        <Button asChild>
          <Link to={`/ticket/${ticket.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
