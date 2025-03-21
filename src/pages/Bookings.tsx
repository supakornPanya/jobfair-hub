
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { format, parseISO } from "date-fns";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, PlusIcon, Loader2, InfoIcon, ExternalLinkIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { InterviewSession, Company } from "@/types";
import { cn } from "@/lib/utils";

const Bookings = () => {
  const { user } = useAuth();
  const { bookings, isLoading, getUserBookings, getCompanies, createBooking, updateBooking, deleteBooking } = useBooking();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isCompaniesLoading, setIsCompaniesLoading] = useState(true);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  
  const [selectedBooking, setSelectedBooking] = useState<InterviewSession | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  const [newBookingCompanyId, setNewBookingCompanyId] = useState("");
  const [newBookingDate, setNewBookingDate] = useState<Date | undefined>(undefined);
  
  const [editBookingCompanyId, setEditBookingCompanyId] = useState("");
  const [editBookingDate, setEditBookingDate] = useState<Date | undefined>(undefined);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the date range for the job fair
  const minDate = new Date("2022-05-10");
  const maxDate = new Date("2022-05-13");

  // Load bookings and companies on component mount
  useEffect(() => {
    const loadData = async () => {
      await getUserBookings();
      
      setIsCompaniesLoading(true);
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Failed to load companies:", error);
      } finally {
        setIsCompaniesLoading(false);
      }
    };
    
    loadData();
  }, [getUserBookings, getCompanies]);

  // Handle creating a new booking
  const handleCreateBooking = async () => {
    if (!newBookingCompanyId || !newBookingDate) return;
    
    setIsSubmitting(true);
    try {
      await createBooking(
        newBookingCompanyId,
        newBookingDate.toISOString()
      );
      setIsCreateDialogOpen(false);
      setNewBookingCompanyId("");
      setNewBookingDate(undefined);
    } catch (error) {
      console.error("Failed to create booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    } catch (error) {
      console.error("Failed to update booking:", error);
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
    } catch (error) {
      console.error("Failed to delete booking:", error);
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

  // Open company details dialog
  const openCompanyDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsCompanyDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

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
            My Interview Bookings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage your job fair interview sessions
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={bookings.length >= 3}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Book Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Book a New Interview</DialogTitle>
                <DialogDescription>
                  Select a company and date for your interview session.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="company" className="text-right font-medium col-span-1">
                    Company
                  </label>
                  <div className="col-span-3">
                    <Select 
                      value={newBookingCompanyId} 
                      onValueChange={(value) => setNewBookingCompanyId(value)}
                    >
                      <SelectTrigger id="company">
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
                  <label htmlFor="date" className="text-right font-medium col-span-1">
                    Date
                  </label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newBookingDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newBookingDate ? format(newBookingDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newBookingDate}
                          onSelect={setNewBookingDate}
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
                  type="submit"
                  onClick={handleCreateBooking}
                  disabled={!newBookingCompanyId || !newBookingDate || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Interview"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {bookings.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Booking limit reached</AlertTitle>
            <AlertDescription>
              You have booked the maximum number of interviews (3). You can edit or delete existing bookings.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

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
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No interviews booked yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't booked any interview sessions yet. You can book up to 3 interviews with different companies.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Book Your First Interview
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div 
                            className="cursor-pointer hover:underline"
                            onClick={() => openCompanyDialog(booking.company)}
                          >
                            {booking.company.name}
                          </div>
                        </div>
                      </TableCell>
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
              Update the company or date for your interview session.
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
              Are you sure you want to cancel your interview with {selectedBooking?.company.name}?
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

      {/* Company Details Dialog */}
      <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedCompany?.name}</DialogTitle>
            <DialogDescription>
              Company details and information
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedCompany.description}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-2 items-start">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{selectedCompany.address}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 items-start">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{selectedCompany.telephone}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 items-start">
                  <ExternalLinkIcon className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <div className="text-sm font-medium">Website</div>
                    <a 
                      href={selectedCompany.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedCompany.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompanyDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
