
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/types/ticket";
import { format, parse } from "date-fns";

interface PurchaseDialogProps {
  ticket: Ticket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buyerName: string;
  setBuyerName: (name: string) => void;
  buyerEmail: string;
  setBuyerEmail: (email: string) => void;
  buyerPhone: string;
  setBuyerPhone: (phone: string) => void;
  onPurchase: () => void;
}

const PurchaseDialog = ({
  ticket,
  open,
  onOpenChange,
  buyerName,
  setBuyerName,
  buyerEmail,
  setBuyerEmail,
  buyerPhone,
  setBuyerPhone,
  onPurchase
}: PurchaseDialogProps) => {
  // Format the date for display
  const formattedDate = format(
    parse(ticket.departureDate, "yyyy-MM-dd", new Date()),
    "dd MMM yyyy"
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onPurchase}>
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
