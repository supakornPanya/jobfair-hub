
import { motion } from "framer-motion";
import { BuildingIcon, CalendarIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Company } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

interface CompanyCardsProps {
  companies: Company[];
  isLoading: boolean;
  onBookInterview?: (companyId: string) => void;
}

const CompanyCards = ({ companies, isLoading, onBookInterview }: CompanyCardsProps) => {
  const { user } = useAuth();
  
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {companies.map((company) => (
        <motion.div key={company.id} variants={item}>
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
                  onClick={() => onBookInterview && onBookInterview(company.id)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book Interview
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => onBookInterview && onBookInterview(company.id)}
                >
                  Sign in to book
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CompanyCards;
