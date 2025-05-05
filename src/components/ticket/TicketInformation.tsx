
import { Ticket } from "@/types/ticket";

interface TicketInformationProps {
  ticket: Ticket;
}

const TicketInformation = ({ ticket }: TicketInformationProps) => {
  return (
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
  );
};

export default TicketInformation;
