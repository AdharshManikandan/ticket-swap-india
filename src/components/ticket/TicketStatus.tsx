
import { Button } from "@/components/ui/button";
import { Ticket, TicketStatus as TicketStatusEnum } from "@/types/ticket";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface TicketStatusProps {
  ticket: Ticket;
  onPurchaseClick: () => void;
}

const TicketStatus = ({ ticket, onPurchaseClick }: TicketStatusProps) => {
  return (
    <div>
      <h2 className="text-sm uppercase text-gray-500 font-medium mb-2">Status & Description</h2>
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          {ticket.status === TicketStatusEnum.AVAILABLE ? (
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          )}
          <div>
            <p className="font-medium">
              {ticket.status === TicketStatusEnum.AVAILABLE
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
        {ticket.status === TicketStatusEnum.AVAILABLE ? (
          <Button className="w-full md:w-auto" onClick={onPurchaseClick}>
            Purchase This Ticket
          </Button>
        ) : (
          <div className="flex items-center justify-center bg-red-50 text-red-700 p-3 rounded-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>This ticket has been sold</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatus;
