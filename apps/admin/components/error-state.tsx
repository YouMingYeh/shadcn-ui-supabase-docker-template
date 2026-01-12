import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = "載入資料時發生錯誤",
  message = "載入此頁面時發生錯誤，請稍後再試。",
}: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
