
import { Company } from "@/types";
import { useAuth } from "@/context/AuthContext";
import CompanyCard from "./CompanyCard";
import CardGrid from "./CardGrid";
import LoadingGrid from "./LoadingGrid";

/**
 * CompanyCards Component
 * 
 * A component that displays a grid of company cards with loading states.
 * 
 * Props:
 * - companies: Array of Company objects
 * - isLoading: Boolean indicating if companies are loading
 * - onBookInterview: Optional callback function when "Book Interview" is clicked
 * 
 * Usage example:
 * ```tsx
 * <CompanyCards 
 *   companies={companiesData} 
 *   isLoading={isLoadingCompanies}
 *   onBookInterview={handleBookInterview} 
 * />
 * ```
 * 
 * Mock data example:
 * ```tsx
 * const mockCompanies = [
 *   {
 *     id: "1",
 *     name: "Tech Solutions Inc.",
 *     description: "A leading technology company...",
 *     address: "123 Tech Street, San Francisco, CA",
 *     website: "https://techsolutions.example.com",
 *     telephone: "555-123-4567"
 *   },
 *   // more companies...
 * ];
 * ```
 */

interface CompanyCardsProps {
  companies: Company[];
  isLoading: boolean;
  onBookInterview?: (companyId: string) => void;
}

const CompanyCards = ({ companies, isLoading, onBookInterview }: CompanyCardsProps) => {
  const { user } = useAuth();
  
  if (isLoading) {
    return <LoadingGrid />;
  }

  return (
    <CardGrid>
      {companies.map((company) => (
        <CompanyCard 
          key={company.id} 
          company={company} 
          onBookInterview={onBookInterview}
          showSignInButton={!user}
        />
      ))}
    </CardGrid>
  );
};

export default CompanyCards;
