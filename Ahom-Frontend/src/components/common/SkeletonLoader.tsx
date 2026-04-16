interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function SkeletonLoader({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-grey-light rounded-xl ${className}`}
        />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-grey-border rounded-2xl p-4 space-y-3">
      <div className="h-24 bg-grey-light rounded-lg animate-pulse" />
      <div className="h-4 bg-grey-light rounded animate-pulse w-3/4" />
      <div className="h-3 bg-grey-light rounded animate-pulse w-1/2" />
      <div className="flex items-center justify-between">
        <div className="h-5 bg-grey-light rounded animate-pulse w-16" />
        <div className="h-10 w-10 bg-grey-light rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="border border-grey-border rounded-2xl p-4 flex flex-col items-center space-y-2 min-w-[170px]">
      <div className="h-16 w-16 bg-grey-light rounded-full animate-pulse" />
      <div className="h-4 bg-grey-light rounded animate-pulse w-24" />
    </div>
  );
}
