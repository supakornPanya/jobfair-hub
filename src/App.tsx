
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
import Companies from "./pages/Companies";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
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
                path="/bookings"
                element={
                  <Layout>
                    <Bookings />
                  </Layout>
                }
              />
              <Route
                path="/companies"
                element={
                  <Layout>
                    <Companies />
                  </Layout>
                }
              />
              <Route
                path="/admin"
                element={
                  <Layout>
                    <Admin />
                  </Layout>
                }
              />
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

export default App;
