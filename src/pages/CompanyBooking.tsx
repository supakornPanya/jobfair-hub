
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BuildingIcon, Loader2, MapPinIcon, PhoneIcon, ExternalLinkIcon } from "lucide-react";
import { Company } from "@/types";
import { cn } from "@/lib/utils";
import BookingList from "@/components/BookingList";

const CompanyBooking = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, isLoading, getUserBookings, getCompanies, createBooking } = useBooking();
  
  const [company, setCompany] = useState<Company | null>(null);
  const [isCompanyLoading, setIsCompanyLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the date range for the job fair
  const minDate = new Date("2022-05-10");
  const maxDate = new Date("2022-05-13");

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: `/booking/${companyId}` } });
    }
  }, [user, navigate, companyId]);

  useEffect(() => {
    const loadData = async () => {
      if (!companyId) return;
      
      await getUserBookings();
      
      setIsCompanyLoading(true);
      try {
        const companies = await getCompanies();
        const foundCompany = companies.find(c => c.id === companyId);
        
        if (foundCompany) {
          setCompany(foundCompany);
        } else {
          toast({
            title: "Company not found",
            description: "The company you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to load company:", error);
        toast({
          title: "Error loading company",
          description: "There was an error loading the company information.",
          variant: "destructive",
        });
      } finally {
        setIsCompanyLoading(false);
      }
    };
    
    loadData();
  }, [companyId, getUserBookings, getCompanies, navigate]);

  const handleBookInterview = async () => {
    if (!companyId || !selectedDate) return;
    
    setIsSubmitting(true);
    try {
      await createBooking(
        companyId,
        selectedDate.toISOString()
      );
      navigate("/user");
      
      toast({
        title: "Interview booked",
        description: `Your interview with ${company?.name} has been scheduled.`,
      });
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "An error occurred while booking your interview.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompanyLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-36 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The company you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
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
          Book an Interview with {company.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Select a date during May 10-13, 2022 for your interview
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2"
        >
          <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-1">
                <BuildingIcon className="h-5 w-5 text-[#8a7e66]" />
                <CardTitle className="text-[#5d4d40]">{company.name}</CardTitle>
              </div>
              <CardDescription className="text-[#7d7259]">
                Company Information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-[#5d4d40]">About the Company</h4>
                  <p className="text-[#5d4d40]">{company.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-2 items-start">
                    <MapPinIcon className="h-4 w-4 text-[#8a7e66] mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#5d4d40]">Address</div>
                      <div className="text-sm text-[#7d7259]">{company.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-start">
                    <PhoneIcon className="h-4 w-4 text-[#8a7e66] mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#5d4d40]">Phone</div>
                      <div className="text-sm text-[#7d7259]">{company.telephone}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-start">
                    <ExternalLinkIcon className="h-4 w-4 text-[#8a7e66] mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#5d4d40]">Website</div>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[#8a7e66] hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
            <CardHeader>
              <CardTitle className="text-[#5d4d40]">Select Interview Date</CardTitle>
              <CardDescription className="text-[#7d7259]">
                Choose a date between May 10-13, 2022
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
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

                <Button
                  className="w-full bg-[#8a7e66] hover:bg-[#6b6353]"
                  disabled={!selectedDate || isSubmitting || bookings.length >= 3}
                  onClick={handleBookInterview}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book Interview
                    </>
                  )}
                </Button>

                {bookings.length >= 3 && (
                  <p className="text-sm text-amber-500">
                    You've reached the maximum of 3 bookings.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <BookingList bookings={bookings} isLoading={isLoading} />
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyBooking;
