"use client";

import * as React from "react";
import * as LucideIcons from "lucide-react";

type LucideIconName = keyof typeof LucideIcons;

type IconPlaceholderProps = React.ComponentProps<"svg"> & {
  lucide?: LucideIconName;
  tabler?: string;
  hugeicons?: string;
  phosphor?: string;
  remixicon?: string;
};

function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  ...props
}: IconPlaceholderProps) {
  void tabler;
  void hugeicons;
  void phosphor;
  void remixicon;

  if (!lucide) {
    return null;
  }

  const Icon = LucideIcons[lucide] as React.ComponentType<
    React.ComponentProps<"svg">
  >;

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
}

export { IconPlaceholder };
