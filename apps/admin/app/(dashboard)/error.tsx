"use client";

import { useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div className="text-center">
        <h2 className="text-2xl font-bold">發生錯誤</h2>
        <p className="mt-2 text-muted-foreground">
          {error.message || "發生未預期的錯誤"}
        </p>
      </div>
      <Button onClick={reset}>重試</Button>
    </div>
  );
}
