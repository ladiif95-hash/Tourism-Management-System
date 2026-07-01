import { BedDouble, CalendarCheck, MapPinned, Users } from "lucide-react";

export const entities = {
  destinations: {
    label: "Destinations",
    endpoint: "/api/Destinations",
    id: "destinationId",
    title: "destinationName",
    icon: MapPinned,
    fields: [
      { name: "destinationName", label: "Destination Name", required: true },
      { name: "location", label: "Location", required: true },
      { name: "description", label: "Description", required: true },
      { name: "entryFee", label: "Entry Fee", type: "number", required: true, min: 0 }
    ]
  },
  tourists: {
    label: "Tourists",
    endpoint: "/api/Tourists",
    id: "touristId",
    title: "fullName",
    icon: Users,
    fields: [
      { name: "fullName", label: "Full Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", required: true },
      { name: "country", label: "Country", required: true }
    ]
  },
  hotels: {
    label: "Hotels",
    endpoint: "/api/Hotels",
    id: "hotelId",
    title: "hotelName",
    icon: BedDouble,
    fields: [
      { name: "hotelName", label: "Hotel Name", required: true },
      { name: "location", label: "Location", required: true },
      { name: "phone", label: "Phone", required: true },
      { name: "destinationId", label: "Destination", type: "number", required: true, min: 1, optionsFrom: "destinations" }
    ]
  },
  bookings: {
    label: "Bookings",
    endpoint: "/api/Bookings",
    id: "bookingId",
    title: "bookingId",
    icon: CalendarCheck,
    fields: [
      { name: "touristId", label: "Tourist", type: "number", required: true, min: 1, optionsFrom: "tourists" },
      { name: "destinationId", label: "Destination", type: "number", required: true, min: 1, optionsFrom: "destinations" },
      { name: "bookingDate", label: "Booking Date", type: "date", required: true },
      { name: "numberOfVisitors", label: "Number Of Visitors", type: "number", required: true, min: 1 }
    ]
  }
};
