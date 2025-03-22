
import { motion } from "framer-motion";
import { BuildingIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Company } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

/**
 * CompanyCard Component
 * 
 * A card component that displays company information and provides a booking button.
 * 
 * Props:
 * - company: Company object containing company details
 * - onBookInterview: Optional callback function when the "Book Interview" button is clicked
 * - showSignInButton: Boolean to determine whether to show "Sign in to book" instead of "Book Interview"
 * 
 * Usage example:
 * ```tsx
 * <CompanyCard 
 *   company={companyData} 
 *   onBookInterview={(id) => handleBooking(id)} 
 *   showSignInButton={!user}
 * />
 * ```
 */

interface CompanyCardProps {
  company: Company;
  onBookInterview?: (companyId: string) => void;
  showSignInButton?: boolean;
}

const CompanyCard = ({ company, onBookInterview, showSignInButton = false }: CompanyCardProps) => {
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
          {!showSignInButton ? (
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
  );
};

export default CompanyCard;
