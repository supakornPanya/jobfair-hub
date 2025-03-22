
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BuildingIcon, Loader2 } from "lucide-react";
import { Company } from "@/types";
import { cn } from "@/lib/utils";

/**
 * BookingForm Component
 * 
 * A form component for creating or editing bookings.
 * 
 * Props:
 * - companies: Array of Company objects
 * - initialCompanyId: Optional initial company ID for edit mode
 * - initialDate: Optional initial date for edit mode
 * - onSubmit: Function called when form is submitted with companyId and date
 * - onCancel: Function called when cancel button is clicked
 * - isSubmitting: Boolean indicating if form submission is in progress
 * - submitLabel: Label for the submit button (default: "Book Interview")
 * 
 * Usage example:
 * ```tsx
 * <BookingForm 
 *   companies={companiesData}
 *   onSubmit={(companyId, date) => handleCreateBooking(companyId, date)}
 *   onCancel={() => navigate("/bookings")}
 *   isSubmitting={isSubmitting}
 * />
 * ```
 * 
 * For editing:
 * ```tsx
 * <BookingForm 
 *   companies={companiesData}
 *   initialCompanyId={booking.companyId}
 *   initialDate={new Date(booking.date)}
 *   onSubmit={(companyId, date) => handleUpdateBooking(booking.id, companyId, date)}
 *   onCancel={() => navigate("/user")}
 *   isSubmitting={isSubmitting}
 *   submitLabel="Save Changes"
 * />
 * ```
 * 
 * You can import mock data from mockData.ts:
 * ```tsx
 * import { mockCompanies } from "@/mock/mockData";
 * <BookingForm companies={mockCompanies} onSubmit={handleSubmit} onCancel={handleCancel} />
 * ```
 */

interface BookingFormProps {
  companies: Company[];
  initialCompanyId?: string;
  initialDate?: Date;
  onSubmit: (companyId: string, date: Date) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const BookingForm = ({
  companies,
  initialCompanyId = "",
  initialDate,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Book Interview"
}: BookingFormProps) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(initialCompanyId);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  // Define the date range for the job fair
  const minDate = new Date("2022-05-10");
  const maxDate = new Date("2022-05-13");

  const handleSubmit = () => {
    if (!selectedCompanyId || !selectedDate) return;
    onSubmit(selectedCompanyId, selectedDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-[#fbfbf5] border-[#e2e1d5]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BuildingIcon className="h-5 w-5 text-[#8a7e66]" />
            <CardTitle className="text-[#5d4d40]">Schedule Your Interview</CardTitle>
          </div>
          <CardDescription className="text-[#7d7259]">
            Choose a company and date for your interview session
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
            onClick={onCancel}
            className="border-[#e2e1d5] text-[#5d4d40]"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#8a7e66] hover:bg-[#6b6353]"
            onClick={handleSubmit}
            disabled={!selectedCompanyId || !selectedDate || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookingForm;
