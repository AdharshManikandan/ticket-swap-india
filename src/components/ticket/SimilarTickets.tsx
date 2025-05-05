
import { Ticket, TicketStatus } from "@/types/ticket";
import TicketCard from "@/components/TicketCard";

interface SimilarTicketsProps {
  currentTicket: Ticket;
  allTickets: Ticket[];
}

const SimilarTickets = ({ currentTicket, allTickets }: SimilarTicketsProps) => {
  const similarTickets = allTickets
    .filter(
      (t) =>
        t.id !== currentTicket.id &&
        (t.from === currentTicket.from || t.to === currentTicket.to) &&
        t.status === TicketStatus.AVAILABLE
    )
    .slice(0, 3);

  if (similarTickets.length === 0) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Similar Tickets</h3>
        <p className="text-gray-500 my-8">No similar tickets found at the moment.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Similar Tickets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default SimilarTickets;
