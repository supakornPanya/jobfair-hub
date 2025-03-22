
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { Company } from "@/types";
import { CalendarIcon, BuildingIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
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

  // Card Grid Component
  const CardGrid = ({ children }: { children: React.ReactNode }) => {
    // Animation variants
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };

    return (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {children}
      </motion.div>
    );
  };

  // Card Skeleton Component
  const CardSkeleton = () => {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  };

  // Loading Grid Component
  const LoadingGrid = ({ count = 5 }: { count?: number }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  };

  // Company Card Component
  const CompanyCard = ({ company }: { company: Company }) => {
    // Animation variant for individual item
    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
      <motion.div variants={item}>
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow bg-[#fbfbf5] border-[#e2e1d5]">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2 mb-1">
              <BuildingIcon className="h-5 w-5 text-[#8a7e66]" />
              <CardTitle className="text-[#5d4d40]">{company.name}</CardTitle>
            </div>
            <CardDescription className="line-clamp-1 text-[#7d7259]">
              {company.description.substring(0, 80)}...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <p className="text-sm text-[#5d4d40]">{company.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPinIcon className="h-4 w-4 text-[#8a7e66] mr-2 mt-0.5" />
                  <span className="text-[#7d7259]">{company.address}</span>
                </div>
                
                <div className="flex items-start">
                  <PhoneIcon className="h-4 w-4 text-[#8a7e66] mr-2 mt-0.5" />
                  <span className="text-[#7d7259]">{company.telephone}</span>
                </div>
                
                <div className="flex items-start">
                  <ExternalLinkIcon className="h-4 w-4 text-[#8a7e66] mr-2 mt-0.5" />
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#8a7e66] hover:underline truncate"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {user ? (
              <Button 
                className="w-full bg-[#8a7e66] hover:bg-[#6b6353]" 
                onClick={() => handleBookWithCompany(company.id)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Book Interview
              </Button>
            ) : (
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleBookWithCompany(company.id)}
              >
                Sign in to book
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  // Company Cards Component
  const CompanyCards = () => {
    if (isLoading) {
      return <LoadingGrid />;
    }

    return (
      <CardGrid>
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </CardGrid>
    );
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
        
        <CompanyCards />
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
}

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
