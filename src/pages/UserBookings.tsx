
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, PlusIcon, Loader2, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { InterviewSession } from "@/types";
import { useState } from "react";

const UserBookings = () => {
  const { user } = useAuth();
  const { bookings, isLoading, getUserBookings, deleteBooking } = useBooking();
  const navigate = useNavigate();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<InterviewSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/user" } });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getUserBookings();
    }
  }, [user, getUserBookings]);

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;
    
    setIsSubmitting(true);
    try {
      await deleteBooking(selectedBooking.id);
      setIsDeleteDialogOpen(false);
      setSelectedBooking(null);
      
      toast({
        title: "Booking deleted",
        description: "Your interview booking has been cancelled.",
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

  const openDeleteDialog = (booking: InterviewSession) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

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
            My Profile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage your account and interview bookings
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={() => navigate("/")}
            disabled={bookings.length >= 3}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Book New Interview
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-1"
        >
          <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
            <CardHeader>
              <CardTitle className="text-[#5d4d40]">User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="h-24 w-24 rounded-full bg-[#8a7e66]/20 flex items-center justify-center">
                    <User className="h-12 w-12 text-[#8a7e66]" />
                  </div>
                </div>
                
                {user && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-[#7d7259]">Name</div>
                      <div className="font-medium text-[#5d4d40]">{user.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#7d7259]">Email</div>
                      <div className="font-medium text-[#5d4d40]">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#7d7259]">Phone</div>
                      <div className="font-medium text-[#5d4d40]">{user.telephone}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-3"
        >
          <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
            <CardHeader>
              <CardTitle className="text-[#5d4d40]">My Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-[250px]" />
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-[#8a7e66]/10 flex items-center justify-center mb-4">
                    <CalendarIcon className="h-8 w-8 text-[#8a7e66]" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[#5d4d40]">No interviews booked yet</h3>
                  <p className="text-[#7d7259] mb-6 max-w-md">
                    You haven't booked any interview sessions yet. You can book up to 3 interviews with different companies.
                  </p>
                  <Button 
                    className="bg-[#8a7e66] hover:bg-[#6b6353]"
                    onClick={() => navigate("/")}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Book Your First Interview
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-[#e2e1d5]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, index) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group hover:bg-[#f4f3e8]"
                        >
                          <TableCell className="font-medium text-[#5d4d40]">
                            {booking.company.name}
                          </TableCell>
                          <TableCell className="text-[#7d7259]">{formatDate(booking.date)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/user/booking/${booking.id}`)}
                                className="text-[#8a7e66] hover:text-[#6b6353] hover:bg-[#8a7e66]/10"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDeleteDialog(booking)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#fbfbf5] border-[#e2e1d5]">
          <DialogHeader>
            <DialogTitle className="text-[#5d4d40]">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-[#7d7259]">
              Are you sure you want to cancel your interview with {selectedBooking?.company.name}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#e2e1d5] text-[#5d4d40]"
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

export default UserBookings;
