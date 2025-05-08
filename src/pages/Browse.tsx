
import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filterError, setFilterError] = useState(false);

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
    
    try {
      // In a real app, we'd fetch from API with these params
      // For now, just use mock data
      setTickets(mockTickets.filter(ticket => ticket.status === TicketStatus.AVAILABLE));
    } catch (error) {
      console.error("Error loading tickets:", error);
      toast.error("Failed to load tickets. Please try again.");
    }
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
    try {
      setFilters(newFilters);
      setFilterError(false);
    } catch (error) {
      console.error("Error applying filters:", error);
      setFilterError(true);
    }
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
              {!filterError && (
                <ErrorBoundary fallback={<FilterErrorMessage />}>
                  <FilterSidebar
                    initialFilters={filters}
                    onFilterChange={handleFilterChange}
                    maxPriceValue={maxPrice}
                  />
                </ErrorBoundary>
              )}
              {filterError && <FilterErrorMessage />}
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
                    <ErrorBoundary fallback={<FilterErrorMessage />}>
                      <FilterSidebar
                        initialFilters={filters}
                        onFilterChange={handleFilterChange}
                        maxPriceValue={maxPrice}
                      />
                    </ErrorBoundary>
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

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in component:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback component for filter errors
const FilterErrorMessage = () => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <h3 className="text-md font-medium text-yellow-800 mb-2">Filter Options Unavailable</h3>
    <p className="text-sm text-yellow-700">
      We're having trouble loading the filter options. Please try refreshing the page.
    </p>
  </div>
);

export default Browse;
