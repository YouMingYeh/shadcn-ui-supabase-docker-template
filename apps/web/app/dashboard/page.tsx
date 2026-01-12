import { Suspense } from "react";
import DashboardLoadingSkeleton from "./loading";

function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col h-full overflow-auto p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome to your new app.</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
