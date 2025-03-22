
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * CardSkeleton Component
 * 
 * A skeleton loading state component for company cards.
 * 
 * Props: None
 * 
 * Usage example:
 * ```tsx
 * <CardSkeleton />
 * ```
 * 
 * You can use this in loading states or when fetching data:
 * ```tsx
 * {isLoading ? <CardSkeleton /> : <CompanyCard company={data} />}
 * ```
 */

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

export default CardSkeleton;
