import { Skeleton } from "@workspace/ui/components/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Header Skeleton */}
      <div className="px-8 pt-8 pb-6 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Content Grid */}
      <div className="px-8 pb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
