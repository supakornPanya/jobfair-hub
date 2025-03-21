
import React, { createContext, useContext, useState, useEffect } from "react";
import { InterviewSession, Company, BookingState } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

interface BookingContextType extends BookingState {
  createBooking: (companyId: string, date: string) => Promise<void>;
  updateBooking: (id: string, companyId: string, date: string) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  getUserBookings: () => Promise<InterviewSession[]>;
  getAllBookings: () => Promise<InterviewSession[]>;
  getCompanies: () => Promise<Company[]>;
}

// Mock company data
const mockCompanies: Company[] = [
  {
    id: "company-1",
    name: "TechGiant Inc.",
    address: "123 Silicon Valley, CA",
    website: "https://techgiant.example.com",
    description: "Leading technology company focused on innovation.",
    telephone: "+1 (555) 123-4567",
  },
  {
    id: "company-2",
    name: "GlobalFinance Ltd.",
    address: "456 Wall Street, NY",
    website: "https://globalfinance.example.com",
    description: "International financial services company.",
    telephone: "+1 (555) 987-6543",
  },
  {
    id: "company-3",
    name: "EcoSolutions Corp.",
    address: "789 Green Avenue, OR",
    website: "https://ecosolutions.example.com",
    description: "Sustainable energy and environmental solutions provider.",
    telephone: "+1 (555) 456-7890",
  },
  {
    id: "company-4",
    name: "MediHealth Systems",
    address: "101 Hospital Road, MA",
    website: "https://medihealth.example.com",
    description: "Healthcare technology and services company.",
    telephone: "+1 (555) 234-5678",
  },
  {
    id: "company-5",
    name: "Creative Media Group",
    address: "202 Entertainment Blvd, LA",
    website: "https://creativemedia.example.com",
    description: "Digital media and entertainment production company.",
    telephone: "+1 (555) 345-6789",
  },
];

// Mock interview session data
let mockInterviewSessions: InterviewSession[] = [
  {
    id: "booking-1",
    userId: "user-123",
    companyId: "company-1",
    company: mockCompanies[0],
    date: "2022-05-10T10:00:00Z",
    createdAt: "2022-04-15T14:23:45Z",
    updatedAt: "2022-04-15T14:23:45Z",
  },
  {
    id: "booking-2",
    userId: "user-123",
    companyId: "company-3",
    company: mockCompanies[2],
    date: "2022-05-11T14:30:00Z",
    createdAt: "2022-04-16T09:12:33Z",
    updatedAt: "2022-04-16T09:12:33Z",
  },
  {
    id: "booking-3",
    userId: "admin-123",
    companyId: "company-2",
    company: mockCompanies[1],
    date: "2022-05-12T11:15:00Z",
    createdAt: "2022-04-17T16:45:22Z",
    updatedAt: "2022-04-17T16:45:22Z",
  },
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<BookingState>({
    bookings: [],
    isLoading: false,
    error: null,
  });

  // Load user's bookings when the user changes
  useEffect(() => {
    if (user) {
      getUserBookings().then((bookings) => {
        setState((prev) => ({ ...prev, bookings }));
      });
    } else {
      setState((prev) => ({ ...prev, bookings: [] }));
    }
  }, [user]);

  // Get all companies
  const getCompanies = async (): Promise<Company[]> => {
    // In a real app, you would fetch this data from an API
    return mockCompanies;
  };

  // Get user's bookings
  const getUserBookings = async (): Promise<InterviewSession[]> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Filter bookings for the current user
      const userBookings = mockInterviewSessions
        .filter((booking) => booking.userId === user.id)
        .map((booking) => ({
          ...booking,
          company: mockCompanies.find((company) => company.id === booking.companyId) || booking.company,
        }));
      
      setState((prev) => ({
        ...prev,
        bookings: userBookings,
        isLoading: false,
      }));
      
      return userBookings;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch bookings",
      }));
      
      toast({
        title: "Failed to fetch bookings",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
      
      return [];
    }
  };

  // Get all bookings (admin only)
  const getAllBookings = async (): Promise<InterviewSession[]> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!user?.isAdmin) {
        throw new Error("Unauthorized access");
      }
      
      // Return all bookings with company details
      const allBookingsWithCompanyDetails = mockInterviewSessions.map((booking) => ({
        ...booking,
        company: mockCompanies.find((company) => company.id === booking.companyId) || booking.company,
      }));
      
      setState((prev) => ({
        ...prev,
        bookings: allBookingsWithCompanyDetails,
        isLoading: false,
      }));
      
      return allBookingsWithCompanyDetails;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch all bookings",
      }));
      
      toast({
        title: "Failed to fetch all bookings",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
      
      return [];
    }
  };

  // Create a new booking
  const createBooking = async (companyId: string, date: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Check if user already has 3 bookings
      const userBookings = mockInterviewSessions.filter((booking) => booking.userId === user.id);
      if (userBookings.length >= 3) {
        throw new Error("You have reached the maximum limit of 3 interview bookings");
      }
      
      // Validate date is within May 10-13, 2022
      const bookingDate = new Date(date);
      const startDate = new Date("2022-05-10T00:00:00Z");
      const endDate = new Date("2022-05-13T23:59:59Z");
      
      if (bookingDate < startDate || bookingDate > endDate) {
        throw new Error("Booking date must be between May 10-13, 2022");
      }
      
      // Create a new booking
      const newBooking: InterviewSession = {
        id: `booking-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        companyId,
        company: mockCompanies.find((company) => company.id === companyId) as Company,
        date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Add the booking to mock data
      mockInterviewSessions = [...mockInterviewSessions, newBooking];
      
      // Update state
      setState((prev) => ({
        ...prev,
        bookings: [...prev.bookings, newBooking],
        isLoading: false,
      }));
      
      toast({
        title: "Booking created",
        description: `Your interview with ${newBooking.company.name} has been scheduled.`,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to create booking",
      }));
      
      toast({
        title: "Failed to create booking",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  // Update an existing booking
  const updateBooking = async (id: string, companyId: string, date: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Find the booking to update
      const bookingIndex = mockInterviewSessions.findIndex((booking) => booking.id === id);
      if (bookingIndex === -1) {
        throw new Error("Booking not found");
      }
      
      // Check if the user has permission to update this booking
      const booking = mockInterviewSessions[bookingIndex];
      if (booking.userId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to update this booking");
      }
      
      // Validate date is within May 10-13, 2022
      const bookingDate = new Date(date);
      const startDate = new Date("2022-05-10T00:00:00Z");
      const endDate = new Date("2022-05-13T23:59:59Z");
      
      if (bookingDate < startDate || bookingDate > endDate) {
        throw new Error("Booking date must be between May 10-13, 2022");
      }
      
      // Update the booking
      const updatedBooking: InterviewSession = {
        ...booking,
        companyId,
        company: mockCompanies.find((company) => company.id === companyId) as Company,
        date,
        updatedAt: new Date().toISOString(),
      };
      
      // Update mock data
      mockInterviewSessions[bookingIndex] = updatedBooking;
      
      // Update state
      setState((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) => (b.id === id ? updatedBooking : b)),
        isLoading: false,
      }));
      
      toast({
        title: "Booking updated",
        description: `Your interview with ${updatedBooking.company.name} has been rescheduled.`,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to update booking",
      }));
      
      toast({
        title: "Failed to update booking",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  // Delete a booking
  const deleteBooking = async (id: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Find the booking to delete
      const booking = mockInterviewSessions.find((booking) => booking.id === id);
      if (!booking) {
        throw new Error("Booking not found");
      }
      
      // Check if the user has permission to delete this booking
      if (booking.userId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to delete this booking");
      }
      
      // Delete from mock data
      mockInterviewSessions = mockInterviewSessions.filter((booking) => booking.id !== id);
      
      // Update state
      setState((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking.id !== id),
        isLoading: false,
      }));
      
      toast({
        title: "Booking deleted",
        description: "Your interview booking has been cancelled.",
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to delete booking",
      }));
      
      toast({
        title: "Failed to delete booking",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const value = {
    ...state,
    createBooking,
    updateBooking,
    deleteBooking,
    getUserBookings,
    getAllBookings,
    getCompanies,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
