
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuildingIcon, CalendarIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Company } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const Companies = () => {
  const { getCompanies } = useBooking();
  const { user } = useAuth();
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
    navigate("/bookings");
  };

  // Stagger animation for card grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold tracking-tight"
        >
          Participating Companies
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Browse all companies participating in our online job fair
        </motion.p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
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
          ))}
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {companies.map((company) => (
            <motion.div key={company.id} variants={item}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <BuildingIcon className="h-5 w-5 text-primary" />
                    <CardTitle>{company.name}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-1">
                    {company.description.substring(0, 80)}...
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <p className="text-sm">{company.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <span className="text-muted-foreground">{company.address}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <span className="text-muted-foreground">{company.telephone}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <ExternalLinkIcon className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
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
                      className="w-full" 
                      onClick={handleBookInterview}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book Interview
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => navigate("/login")}
                    >
                      Sign in to book
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Companies;
