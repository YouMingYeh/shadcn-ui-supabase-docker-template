"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@workspace/ui/components/button";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  return <Button {...props} loading={pending} />;
}
