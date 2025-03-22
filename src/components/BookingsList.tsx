
import { InterviewSession } from "@/types";
import BookingItem from "./BookingItem";

/**
 * BookingsList Component
 * 
 * A component that displays a list of booking items with loading states and empty state.
 * 
 * Props:
 * - bookings: Array of InterviewSession objects
 * - isLoading: Boolean indicating if bookings are loading
 * - maxBookings: Maximum number of bookings allowed (default: 3)
 * 
 * Usage example:
 * ```tsx
 * <BookingsList 
 *   bookings={userBookings} 
 *   isLoading={isLoadingBookings} 
 * />
 * ```
 * 
 * You can import mock data from mockData.ts:
 * ```tsx
 * import { mockBookings } from "@/mock/mockData";
 * <BookingsList bookings={mockBookings} isLoading={false} />
 * ```
 */

interface BookingsListProps {
  bookings: InterviewSession[];
  isLoading?: boolean;
  maxBookings?: number;
}

const BookingsList = ({ 
  bookings, 
  isLoading = false, 
  maxBookings = 3 
}: BookingsListProps) => {
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

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Your Current Bookings</h3>
      <ul className="space-y-2">
        {bookings.map((booking, index) => (
          <BookingItem 
            key={booking.id} 
            booking={booking} 
            index={index} 
          />
        ))}
      </ul>
      <div className="text-sm text-muted-foreground pt-1">
        {bookings.length === maxBookings ? (
          <p className="text-amber-500">You've reached the maximum of {maxBookings} bookings.</p>
        ) : (
          <p>You can book {maxBookings - bookings.length} more interview{maxBookings - bookings.length !== 1 ? 's' : ''}.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
