
import { motion } from "framer-motion";

/**
 * PageHeader Component
 * 
 * A reusable component for page headers with animation.
 * 
 * Props:
 * - title: The main heading text
 * - description: Optional subheading or description text
 * 
 * Usage example:
 * ```tsx
 * <PageHeader 
 *   title="Company Listings" 
 *   description="Browse available companies for interviews" 
 * />
 * ```
 */

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold tracking-tight"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default PageHeader;
