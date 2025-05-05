
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket } from "../types/ticket";
import { mockTickets } from "../data/mockData";
import TicketCard from "./TicketCard";
import { ArrowRight } from "lucide-react";

const FeaturedTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // In a real app, we'd fetch from an API
    // For now, just use the mock data
    setTickets(mockTickets.slice(0, 4));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Tickets</h2>
            <p className="text-gray-600 max-w-2xl">
              Browse through available tickets from people who can no longer use them.
              Great deals for last-minute travel!
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/browse" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <div className="bg-accent-50 border border-accent-100 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Need to cancel your travel?</h3>
            <p className="text-gray-700 mb-6">
              Don't lose your money on cancellation fees. List your ticket on TicketSwapIndia
              and recover more of your investment.
            </p>
            <Button size="lg" asChild>
              <Link to="/list-ticket">
                List Your Ticket
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTickets;
