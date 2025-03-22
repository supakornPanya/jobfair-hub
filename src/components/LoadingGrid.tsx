
import CardSkeleton from "./CardSkeleton";

/**
 * LoadingGrid Component
 * 
 * A grid of skeleton cards to display while loading company data.
 * 
 * Props:
 * - count: Number of skeleton cards to display (default: 5)
 * 
 * Usage example:
 * ```tsx
 * <LoadingGrid count={6} />
 * ```
 */

interface LoadingGridProps {
  count?: number;
}

const LoadingGrid = ({ count = 5 }: LoadingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingGrid;
