
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { Company } from "@/types";
import { CalendarIcon, BuildingIcon, ExternalLinkIcon } from "lucide-react";
import CompanyCards from "@/components/CompanyCards";

const Index = () => {
  const { user } = useAuth();
  const { getCompanies } = useBooking();
  const navigate = useNavigate();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to load companies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, [getCompanies]);

  const handleBookInterview = () => {
    if (user) {
      navigate("/bookings");
    } else {
      navigate("/login");
    }
  };

  const handleBookWithCompany = (companyId: string) => {
    if (user) {
      navigate(`/booking/${companyId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Virtual Job Fair 2022
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl"
        >
          Connect with leading companies and schedule interviews during our virtual job fair from May 10-13, 2022.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button size="lg" onClick={handleBookInterview}>
            <CalendarIcon className="mr-2 h-5 w-5" />
            Book an Interview
          </Button>
        </motion.div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="space-y-6">
        <div className="text-center space-y-2 mb-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            Participating Companies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Meet these industry leaders at our job fair
          </motion.p>
        </div>
        
        <CompanyCards 
          companies={companies} 
          isLoading={isLoading} 
          onBookInterview={handleBookWithCompany}
        />
      </section>

      {/* How It Works Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2 mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Three simple steps to land your next job
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              className="bg-card rounded-lg border p-6 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Step data
const steps = [
  {
    title: "Create an Account",
    description: "Sign up for a free account to access our platform and company listings.",
    icon: BuildingIcon,
  },
  {
    title: "Select Companies",
    description: "Browse participating companies and select up to 3 for interviews.",
    icon: ExternalLinkIcon,
  },
  {
    title: "Schedule Interviews",
    description: "Choose your preferred date and time during May 10-13 for interviews.",
    icon: CalendarIcon,
  },
];

export default Index;
