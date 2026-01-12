"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">驗證錯誤</CardTitle>
            <CardDescription>登入時發生問題，請重試。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="default"
              className="w-full"
              onClick={() => (window.location.href = "/login")}
            >
              返回登入頁面
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
