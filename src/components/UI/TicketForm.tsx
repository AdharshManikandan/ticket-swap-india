
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TicketType, Ticket, TicketStatus } from "@/types/ticket";
import { cities, mockTickets } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const TicketForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();

  const [formData, setFormData] = useState({
    type: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    originalPrice: "",
    sellingPrice: "",
    pnr: "",
    seatNumber: "",
    class: "",
    description: "",
    transportCompany: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a departure date.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.type || !formData.from || !formData.to) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call
    // For now, we'll just show a success message and redirect
    
    // Create a new ticket object
    const newTicket: Ticket = {
      id: `t${mockTickets.length + 1}`,
      type: formData.type as TicketType,
      from: formData.from,
      to: formData.to,
      departureDate: format(date, "yyyy-MM-dd"),
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      originalPrice: parseFloat(formData.originalPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      seller: "You",
      pnr: formData.pnr,
      seatNumber: formData.seatNumber,
      class: formData.class,
      description: formData.description,
      status: TicketStatus.AVAILABLE,
      listedDate: format(new Date(), "yyyy-MM-dd"),
      transportCompany: formData.transportCompany,
      refundable: false,
      transferable: true,
    };
    
    // Add to mock tickets (in a real app, this would be an API call)
    mockTickets.push(newTicket);
    
    // Show success message
    toast({
      title: "Ticket Listed Successfully",
      description: "Your ticket has been listed for sale.",
    });
    
    // Redirect to the ticket detail page
    navigate(`/ticket/${newTicket.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ticket Type */}
        <div className="space-y-2">
          <Label htmlFor="ticketType">Ticket Type <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ticket type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TicketType.TRAIN}>Train</SelectItem>
              <SelectItem value={TicketType.BUS}>Bus</SelectItem>
              <SelectItem value={TicketType.FLIGHT}>Flight</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Transport Company */}
        <div className="space-y-2">
          <Label htmlFor="transportCompany">Transport Company</Label>
          <Input
            id="transportCompany"
            name="transportCompany"
            placeholder="e.g., Indian Railways, SpiceJet"
            value={formData.transportCompany}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From */}
        <div className="space-y-2">
          <Label htmlFor="from">From <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.from}
            onValueChange={(value) => handleSelectChange("from", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select departure city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* To */}
        <div className="space-y-2">
          <Label htmlFor="to">To <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.to}
            onValueChange={(value) => handleSelectChange("to", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select arrival city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departure Date */}
        <div className="space-y-2">
          <Label>Departure Date <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Departure Time */}
        <div className="space-y-2">
          <Label htmlFor="departureTime">Departure Time <span className="text-red-500">*</span></Label>
          <Input
            id="departureTime"
            name="departureTime"
            placeholder="e.g., 14:30"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Arrival Time */}
        <div className="space-y-2">
          <Label htmlFor="arrivalTime">Arrival Time <span className="text-red-500">*</span></Label>
          <Input
            id="arrivalTime"
            name="arrivalTime"
            placeholder="e.g., 18:45"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Price */}
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (₹) <span className="text-red-500">*</span></Label>
          <Input
            id="originalPrice"
            name="originalPrice"
            type="number"
            min="1"
            placeholder="Original ticket price"
            value={formData.originalPrice}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Selling Price */}
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (₹) <span className="text-red-500">*</span></Label>
          <Input
            id="sellingPrice"
            name="sellingPrice"
            type="number"
            min="1"
            placeholder="Your selling price"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PNR */}
        <div className="space-y-2">
          <Label htmlFor="pnr">PNR / Booking Reference <span className="text-red-500">*</span></Label>
          <Input
            id="pnr"
            name="pnr"
            placeholder="Your ticket PNR number"
            value={formData.pnr}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Seat Number */}
        <div className="space-y-2">
          <Label htmlFor="seatNumber">Seat Number</Label>
          <Input
            id="seatNumber"
            name="seatNumber"
            placeholder="e.g., A12, 23B"
            value={formData.seatNumber}
            onChange={handleChange}
          />
        </div>
        
        {/* Class */}
        <div className="space-y-2">
          <Label htmlFor="class">Class/Category</Label>
          <Input
            id="class"
            name="class"
            placeholder="e.g., AC 2-tier, Economy"
            value={formData.class}
            onChange={handleChange}
          />
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add any additional information about your ticket"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">
          List Ticket for Sale
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;
