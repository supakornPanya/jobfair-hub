
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BuildingIcon, Loader2 } from "lucide-react";
import { InterviewSession, Company } from "@/types";
import { cn } from "@/lib/utils";

const EditBooking = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, getUserBookings, getCompanies, updateBooking } = useBooking();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState<InterviewSession | null>(null);
  
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the date range for the job fair
  const minDate = new Date("2022-05-10");
  const maxDate = new Date("2022-05-13");

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadData = async () => {
      if (!bookingId) return;
      
      setIsLoading(true);
      try {
        // Load user bookings and companies
        const userBookings = await getUserBookings();
        const companiesData = await getCompanies();
        
        setCompanies(companiesData);
        
        // Find the booking to edit
        const booking = userBookings.find(b => b.id === bookingId);
        
        if (booking) {
          setBookingData(booking);
          setSelectedCompanyId(booking.companyId);
          setSelectedDate(parseISO(booking.date));
        } else {
          toast({
            title: "Booking not found",
            description: "The booking you're trying to edit doesn't exist.",
            variant: "destructive",
          });
          navigate("/user");
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error loading data",
          description: "There was an error loading your booking information.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [bookingId, getUserBookings, getCompanies, navigate]);

  const handleUpdateBooking = async () => {
    if (!bookingId || !selectedCompanyId || !selectedDate) return;
    
    setIsSubmitting(true);
    try {
      await updateBooking(
        bookingId,
        selectedCompanyId,
        selectedDate.toISOString()
      );
      
      toast({
        title: "Booking updated",
        description: "Your interview has been successfully rescheduled.",
      });
      
      navigate("/user");
    } catch (error) {
      console.error("Failed to update booking:", error);
      
      toast({
        title: "Failed to update booking",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-1 gap-6">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The booking you're trying to edit doesn't exist.
        </p>
        <Button onClick={() => navigate("/user")}>Return to Profile</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold tracking-tight"
        >
          Edit Interview Booking
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Update your interview details
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BuildingIcon className="h-5 w-5 text-[#8a7e66]" />
              <CardTitle className="text-[#5d4d40]">Update Your Interview</CardTitle>
            </div>
            <CardDescription className="text-[#7d7259]">
              Change the company or date for your interview session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-[#5d4d40]">
                  Company
                </label>
                <Select 
                  value={selectedCompanyId} 
                  onValueChange={setSelectedCompanyId}
                >
                  <SelectTrigger id="company" className="border-[#e2e1d5]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-[#5d4d40]">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-[#e2e1d5]",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < minDate || 
                        date > maxDate || 
                        date.getDay() === 0 || 
                        date.getDay() === 6
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/user")}
              className="border-[#e2e1d5] text-[#5d4d40]"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#8a7e66] hover:bg-[#6b6353]"
              onClick={handleUpdateBooking}
              disabled={!selectedCompanyId || !selectedDate || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditBooking;
