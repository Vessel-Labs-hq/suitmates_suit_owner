import { cn } from "@/utils";

export const TableRow = ({ children, className }: IProps) => {
  return (
    <div className={cn("grid grid-cols-4 gap-2 p-2 py-3 text-center", className)}>
      {children}
    </div>
  );
};

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-dark200/20", className)} {...props} />
  );
}

export const renderSkeltonLoader = (loading: boolean) => {
  const renderSkeleton = (component: React.ReactNode, props?: SkeletonProps) =>
    loading ? <Skeleton {...props} /> : component;

  return { renderSkeleton };
};
