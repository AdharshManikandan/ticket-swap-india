
export enum TicketType {
  TRAIN = "train",
  BUS = "bus",
  FLIGHT = "flight"
}

export enum TicketStatus {
  AVAILABLE = "available",
  PENDING = "pending",
  SOLD = "sold"
}

export interface Ticket {
  id: string;
  type: TicketType;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  originalPrice: number;
  sellingPrice: number;
  seller: string;
  pnr: string;
  seatNumber?: string;
  class?: string;
  description?: string;
  status: TicketStatus;
  listedDate: string;
  transportCompany?: string;
  refundable: boolean;
  transferable: boolean;
}

export interface FilterOptions {
  type?: TicketType[];
  from?: string;
  to?: string;
  departureDate?: string;
  maxPrice?: number;
  minPrice?: number;
}
