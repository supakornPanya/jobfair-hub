
import { motion } from "framer-motion";
import { InterviewSession } from "@/types";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, Building } from "lucide-react";

interface BookingListProps {
  bookings: InterviewSession[];
  isLoading?: boolean;
}

const BookingList = ({ bookings, isLoading = false }: BookingListProps) => {
  if (isLoading) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        You haven't booked any interviews yet.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy");
  };

  const formatTime = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "h:mm a");
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Your Current Bookings</h3>
      <ul className="space-y-2">
        {bookings.map((booking, index) => (
          <motion.li
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border bg-card p-3 shadow-sm"
          >
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <Building className="h-4 w-4 text-primary mr-2" />
                <span className="font-medium">{booking.company.name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                <span>{formatDate(booking.date)}</span>
                <Clock className="h-3.5 w-3.5 mx-2" />
                <span>{formatTime(booking.date)}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="text-sm text-muted-foreground pt-1">
        {bookings.length === 3 ? (
          <p className="text-amber-500">You've reached the maximum of 3 bookings.</p>
        ) : (
          <p>You can book {3 - bookings.length} more interview{3 - bookings.length !== 1 ? 's' : ''}.</p>
        )}
      </div>
    </div>
  );
};

export default BookingList;
