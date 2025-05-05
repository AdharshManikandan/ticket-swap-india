
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: { className?: string }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (from) searchParams.set("from", from);
    if (to) searchParams.set("to", to);
    if (date) searchParams.set("date", format(date, "yyyy-MM-dd"));
    
    navigate(`/browse?${searchParams.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "flex flex-col md:flex-row gap-3 p-4 md:p-6 rounded-2xl bg-white shadow-lg", 
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-grow">
        <Select onValueChange={(value) => setFrom(value)} value={from}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="From" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => setTo(value)} value={to}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="To" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal w-full",
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
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        
        <Button type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Find Tickets
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
