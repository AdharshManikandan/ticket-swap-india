
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Ticket, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === "/") {
      // If already on homepage, just scroll to the section
      const section = document.getElementById("how-it-works");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to homepage and then to the section
      navigate("/#how-it-works");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-brand-700" />
          <span className="font-heading font-bold text-xl text-brand-800">
            TicketSwap<span className="text-accent-500">India</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/browse"
            className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
          >
            Browse Tickets
          </Link>
          <Link
            to="/list-ticket"
            className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
          >
            Sell Your Ticket
          </Link>
          <a
            href="/#how-it-works"
            onClick={navigateToHowItWorks}
            className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors cursor-pointer"
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            asChild
          >
            <Link to="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/list-ticket" className="flex items-center gap-1">
              Sell Ticket <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
