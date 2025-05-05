
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Ticket Not Found</h1>
      <p className="text-gray-600 mb-8">
        The ticket you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link to="/browse">Browse Available Tickets</Link>
      </Button>
    </div>
  );
};

export default NotFound;
