
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * CardGrid Component
 * 
 * A responsive grid layout component with staggered animations for displaying cards.
 * 
 * Props:
 * - children: React nodes to be displayed in the grid
 * 
 * Usage example:
 * ```tsx
 * <CardGrid>
 *   {companies.map(company => (
 *     <CompanyCard key={company.id} company={company} />
 *   ))}
 * </CardGrid>
 * ```
 */

interface CardGridProps {
  children: ReactNode;
}

const CardGrid = ({ children }: CardGridProps) => {
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

export default CardGrid;
