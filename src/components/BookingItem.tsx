
import { motion } from "framer-motion";
import { InterviewSession } from "@/types";
import { format, parseISO } from "date-fns";
import { Building, Calendar, Clock } from "lucide-react";

/**
 * BookingItem Component
 * 
 * A component to display a single booking/interview session.
 * 
 * Props:
 * - booking: InterviewSession object containing booking details
 * - index: Optional index for animation delay
 * 
 * Usage example:
 * ```tsx
 * <BookingItem booking={bookingData} index={0} />
 * ```
 */

interface BookingItemProps {
  booking: InterviewSession;
  index?: number;
}

const BookingItem = ({ booking, index = 0 }: BookingItemProps) => {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy");
  };

  const formatTime = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "h:mm a");
  };

  return (
    <motion.li
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
  );
};

export default BookingItem;
