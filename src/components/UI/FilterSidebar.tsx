
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterOptions, TicketType } from "@/types/ticket";
import { cities } from "@/data/mockData";
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

interface FilterSidebarProps {
  initialFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  maxPriceValue: number;
}

const FilterSidebar = ({
  initialFilters,
  onFilterChange,
  maxPriceValue
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [date, setDate] = useState<Date | undefined>(
    initialFilters.departureDate
      ? new Date(initialFilters.departureDate)
      : undefined
  );
  
  const [priceRange, setPriceRange] = useState<[number]>([
    filters.maxPrice || maxPriceValue
  ]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleTicketTypeChange = (type: TicketType, checked: boolean) => {
    setFilters(prev => {
      const currentTypes = prev.type || [];
      let newTypes: TicketType[];
      
      if (checked) {
        newTypes = [...currentTypes, type];
      } else {
        newTypes = currentTypes.filter(t => t !== type);
      }
      
      return {
        ...prev,
        type: newTypes.length > 0 ? newTypes : undefined
      };
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0]]);
    setFilters(prev => ({
      ...prev,
      maxPrice: value[0]
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setFilters(prev => ({
      ...prev,
      departureDate: newDate ? format(newDate, "yyyy-MM-dd") : undefined
    }));
  };

  const handleFromChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      from: value || undefined
    }));
  };

  const handleToChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      to: value || undefined
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
    setDate(undefined);
    setPriceRange([maxPriceValue]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filter Tickets</h3>
        
        <div className="space-y-6">
          {/* Ticket Type Filter */}
          <div>
            <h4 className="font-medium text-sm mb-3">Ticket Type</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="train" 
                  checked={filters.type?.includes(TicketType.TRAIN)}
                  onCheckedChange={(checked) => 
                    handleTicketTypeChange(TicketType.TRAIN, checked as boolean)
                  }
                />
                <Label htmlFor="train">Train</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bus"
                  checked={filters.type?.includes(TicketType.BUS)}
                  onCheckedChange={(checked) => 
                    handleTicketTypeChange(TicketType.BUS, checked as boolean)
                  }
                />
                <Label htmlFor="bus">Bus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flight"
                  checked={filters.type?.includes(TicketType.FLIGHT)}
                  onCheckedChange={(checked) => 
                    handleTicketTypeChange(TicketType.FLIGHT, checked as boolean)
                  }
                />
                <Label htmlFor="flight">Flight</Label>
              </div>
            </div>
          </div>
          
          {/* Departure City */}
          <div>
            <h4 className="font-medium text-sm mb-3">From</h4>
            <Select 
              value={filters.from} 
              onValueChange={handleFromChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any city</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Destination City */}
          <div>
            <h4 className="font-medium text-sm mb-3">To</h4>
            <Select 
              value={filters.to} 
              onValueChange={handleToChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any city</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Filter */}
          <div>
            <h4 className="font-medium text-sm mb-3">Departure Date</h4>
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
              <PopoverContent className="w-auto p-0" align="start">
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
          
          {/* Price Filter */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-sm">Max Price</h4>
              <span className="text-sm font-medium">₹{priceRange[0]}</span>
            </div>
            <Slider
              defaultValue={[filters.maxPrice || maxPriceValue]}
              max={maxPriceValue}
              step={100}
              value={[priceRange[0]]}
              onValueChange={handlePriceChange}
            />
          </div>
          
          {/* Reset Filters Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
