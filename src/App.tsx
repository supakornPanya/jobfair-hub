
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { Layout } from "./components/Layout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import CompanyBooking from "./pages/CompanyBooking";
import UserBookings from "./pages/UserBookings";
import EditBooking from "./pages/EditBooking";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Index />
                    </Layout>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/booking/:companyId"
                  element={
                    <Layout>
                      <CompanyBooking />
                    </Layout>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <Layout>
                      <Bookings />
                    </Layout>
                  }
                />
                
                {/* User Routes */}
                <Route
                  path="/user"
                  element={
                    <Layout>
                      <UserBookings />
                    </Layout>
                  }
                />
                <Route
                  path="/user/booking/:bookingId"
                  element={
                    <Layout>
                      <EditBooking />
                    </Layout>
                  }
                />
                
                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <Layout>
                      <Admin />
                    </Layout>
                  }
                />
                
                {/* Static Pages */}
                <Route
                  path="/terms"
                  element={
                    <Layout>
                      <Terms />
                    </Layout>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <Layout>
                      <Privacy />
                    </Layout>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
