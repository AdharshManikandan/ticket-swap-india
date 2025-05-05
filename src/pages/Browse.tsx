
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { mockTickets } from "@/data/mockData";
import { Ticket, FilterOptions, TicketType, TicketStatus } from "@/types/ticket";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import FilterSidebar from "@/components/UI/FilterSidebar";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterOptions = {};
    
    const from = searchParams.get("from");
    if (from) initialFilters.from = from;
    
    const to = searchParams.get("to");
    if (to) initialFilters.to = to;
    
    const date = searchParams.get("date");
    if (date) initialFilters.departureDate = date;
    
    setFilters(initialFilters);
    
    // In a real app, we'd fetch from API with these params
    // For now, just use mock data
    setTickets(mockTickets.filter(ticket => ticket.status === TicketStatus.AVAILABLE));
  }, [searchParams]);

  // Calculate max price for filter slider
  useEffect(() => {
    if (tickets.length > 0) {
      const highestPrice = Math.max(...tickets.map(t => t.sellingPrice));
      setMaxPrice(highestPrice);
    }
  }, [tickets]);

  // Apply filters and search term
  useEffect(() => {
    let results = [...tickets];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        ticket =>
          ticket.from.toLowerCase().includes(term) ||
          ticket.to.toLowerCase().includes(term) ||
          ticket.transportCompany?.toLowerCase().includes(term) ||
          ticket.description?.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.from) {
      results = results.filter(ticket => ticket.from === filters.from);
    }
    
    if (filters.to) {
      results = results.filter(ticket => ticket.to === filters.to);
    }
    
    if (filters.departureDate) {
      results = results.filter(ticket => ticket.departureDate === filters.departureDate);
    }
    
    if (filters.type && filters.type.length > 0) {
      results = results.filter(ticket => filters.type?.includes(ticket.type));
    }
    
    if (filters.maxPrice) {
      results = results.filter(ticket => ticket.sellingPrice <= filters.maxPrice);
    }
    
    setFilteredTickets(results);
  }, [tickets, searchTerm, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Available Tickets</h1>
            <p className="text-gray-600">
              Browse through tickets from people who can no longer travel.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by city, transport company or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="lg:grid lg:grid-cols-4 gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block">
              <FilterSidebar
                initialFilters={filters}
                onFilterChange={handleFilterChange}
                maxPriceValue={maxPrice}
              />
            </div>
            
            {/* Filter Sidebar - Mobile */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" /> Filter Tickets
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="py-4">
                    <FilterSidebar
                      initialFilters={filters}
                      onFilterChange={handleFilterChange}
                      maxPriceValue={maxPrice}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Tickets Grid */}
            <div className="lg:col-span-3">
              {filteredTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 mx-auto text-gray-300"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                      <path d="M6 15h1" />
                      <path d="M11 15h1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search term to find more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
