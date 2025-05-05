
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import TicketForm from "@/components/UI/TicketForm";

const ListTicket = () => {
  useEffect(() => {
    document.title = "List Your Ticket - TicketSwap India";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">List Your Ticket</h1>
              <p className="text-gray-600">
                Get more money back by selling your ticket instead of cancelling it.
                Fill in the details below to list your ticket for sale.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <TicketForm />
            </div>
            
            <div className="mt-8 bg-brand-50 border border-brand-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How it works:</h3>
              <ol className="list-decimal ml-5 space-y-2 text-gray-700">
                <li>Complete the form above with your ticket details</li>
                <li>Set your own price (we recommend 70-90% of the original price)</li>
                <li>When someone purchases your ticket, we'll notify you immediately</li>
                <li>You'll receive payment once the ticket transfer is complete</li>
                <li>Our service fee is only 5% of the final sale price</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTicket;
