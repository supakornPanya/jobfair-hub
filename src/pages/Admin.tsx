
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, SearchIcon } from "lucide-react";
import { InterviewSession, Company } from "@/types";
import { cn } from "@/lib/utils";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookings, isLoading, getAllBookings, getCompanies, updateBooking, deleteBooking } = useBooking();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<InterviewSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [selectedBooking, setSelectedBooking] = useState<InterviewSession | null>(null);
  
  const [editBookingCompanyId, setEditBookingCompanyId] = useState("");
  const [editBookingDate, setEditBookingDate] = useState<Date | undefined>(undefined);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the date range for the job fair
  const minDate = new Date("2022-05-10");
  const maxDate = new Date("2022-05-13");

  // Redirect if user is not admin
  useEffect(() => {
    if (user && !user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin page",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, navigate]);

  // Load bookings and companies on component mount
  useEffect(() => {
    const loadData = async () => {
      if (user?.isAdmin) {
        await getAllBookings();
        
        try {
          const companiesData = await getCompanies();
          setCompanies(companiesData);
        } catch (error) {
          console.error("Failed to load companies:", error);
        }
      }
    };
    
    loadData();
  }, [user, getAllBookings, getCompanies]);

  // Update filtered bookings when bookings or search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      setFilteredBookings(
        bookings.filter((booking) => 
          booking.company.name.toLowerCase().includes(lowercasedSearch) ||
          booking.date.toLowerCase().includes(lowercasedSearch)
        )
      );
    }
  }, [bookings, searchTerm]);

  // Handle updating a booking
  const handleUpdateBooking = async () => {
    if (!selectedBooking || !editBookingCompanyId || !editBookingDate) return;
    
    setIsSubmitting(true);
    try {
      await updateBooking(
        selectedBooking.id,
        editBookingCompanyId,
        editBookingDate.toISOString()
      );
      setIsEditDialogOpen(false);
      setSelectedBooking(null);
      setEditBookingCompanyId("");
      setEditBookingDate(undefined);
      
      toast({
        title: "Booking updated",
        description: `You've successfully updated the booking.`,
      });
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

  // Handle deleting a booking
  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;
    
    setIsSubmitting(true);
    try {
      await deleteBooking(selectedBooking.id);
      setIsDeleteDialogOpen(false);
      setSelectedBooking(null);
      
      toast({
        title: "Booking deleted",
        description: `You've successfully deleted the booking.`,
      });
    } catch (error) {
      console.error("Failed to delete booking:", error);
      
      toast({
        title: "Failed to delete booking",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set up edit dialog with selected booking data
  const openEditDialog = (booking: InterviewSession) => {
    setSelectedBooking(booking);
    setEditBookingCompanyId(booking.companyId);
    setEditBookingDate(parseISO(booking.date));
    setIsEditDialogOpen(true);
  };

  // Set up delete dialog with selected booking
  const openDeleteDialog = (booking: InterviewSession) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage all interview bookings for the job fair
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full md:w-[280px]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-md border"
      >
        {isLoading ? (
          <div className="p-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchTerm ? "No bookings match your search criteria." : "There are no interview bookings in the system yet."}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell>
                        <span className="font-medium">
                          {booking.userId === "admin-123" ? "Admin User" : "Demo User"}
                        </span>
                      </TableCell>
                      <TableCell>{booking.company.name}</TableCell>
                      <TableCell>{formatDate(booking.date)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(booking)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(booking)}
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        )}
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Interview Booking</DialogTitle>
            <DialogDescription>
              Update the company or date for this interview session.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-company" className="text-right font-medium col-span-1">
                Company
              </label>
              <div className="col-span-3">
                <Select 
                  value={editBookingCompanyId} 
                  onValueChange={(value) => setEditBookingCompanyId(value)}
                >
                  <SelectTrigger id="edit-company">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-date" className="text-right font-medium col-span-1">
                Date
              </label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !editBookingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editBookingDate ? format(editBookingDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editBookingDate}
                      onSelect={setEditBookingDate}
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
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpdateBooking}
              disabled={!editBookingCompanyId || !editBookingDate || isSubmitting}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteBooking}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
