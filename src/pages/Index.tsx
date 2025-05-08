
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedTickets from "@/components/FeaturedTickets";
import Navbar from "@/components/Navbar";

const Index = () => {
  useEffect(() => {
    document.title = "TicketSwap India - Resell Your Train, Bus & Flight Tickets";
    
    // Handle hash navigation for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Run on mount and when hash changes
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedTickets />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform enables travelers to safely buy and sell unused tickets
              without losing money on cancellation fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Ticket</h3>
              <p className="text-gray-600">
                Upload your ticket details including journey information, PNR, and set your selling price.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Buyers</h3>
              <p className="text-gray-600">
                Receive purchase offers from interested buyers looking for tickets on your route.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transaction</h3>
              <p className="text-gray-600">
                When a buyer purchases your ticket, we facilitate a secure transfer and payment process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Traveler Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how TicketSwapIndia has helped travelers across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  PS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Delhi</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I had to cancel my trip to Mumbai but the airline was offering only 30% refund. 
                Through TicketSwapIndia, I sold my ticket for 85% of the original price. Excellent service!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  RK
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rahul Kumar</h4>
                  <p className="text-sm text-gray-600">Bangalore</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I needed a last-minute train ticket to Chennai during Diwali when all tickets were sold out. 
                Found an affordable option on TicketSwapIndia and reached home for the festival!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">TicketSwapIndia</h3>
              <p className="text-gray-300">
                The smart way to buy and sell train, bus, and flight tickets in India.
                Save money on cancellations and find last-minute travel options.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/browse" className="text-gray-300 hover:text-white transition">Browse Tickets</a></li>
                <li><a href="/list-ticket" className="text-gray-300 hover:text-white transition">Sell Your Ticket</a></li>
                <li><a href="/how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Safety & Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">support@ticketswapindia.com</li>
                <li className="text-gray-300">+91 98765 43210</li>
              </ul>
              <div className="mt-4">
                <p className="text-gray-300 text-sm">© 2025 TicketSwapIndia. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
