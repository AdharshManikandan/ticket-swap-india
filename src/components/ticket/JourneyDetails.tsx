
import { Ticket } from "@/types/ticket";
import { format, parse } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

interface JourneyDetailsProps {
  ticket: Ticket;
}

const JourneyDetails = ({ ticket }: JourneyDetailsProps) => {
  // Format the date
  const formattedDate = format(
    parse(ticket.departureDate, "yyyy-MM-dd", new Date()),
    "EEEE, MMMM d, yyyy"
  );

  return (
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
  );
};

export default JourneyDetails;
