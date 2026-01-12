"use client";

import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyableUrlProps {
  label: string;
  url: string;
  description?: string;
}

export function CopyableUrl({ label, url, description }: CopyableUrlProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.error("無法複製到剪貼簿");
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("已複製到剪貼簿");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("複製失敗");
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-base">{label}</Label>
      <div className="relative">
        <Input
          type="text"
          value={url}
          readOnly
          className="h-11 text-base pr-12 font-mono text-sm bg-muted/50"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 hover:bg-muted"
          onClick={handleCopy}
          aria-label={isCopied ? "已複製" : "複製 URL"}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
