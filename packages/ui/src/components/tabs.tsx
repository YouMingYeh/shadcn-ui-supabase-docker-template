"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@workspace/ui/lib/utils";

type TabsVariant = "default" | "underline";

const TabsListContext = React.createContext<{
  variant: TabsVariant;
  orientation: "horizontal" | "vertical";
}>({
  variant: "default",
  orientation: "horizontal",
});

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsListContext.Provider
      value={{
        variant: "default",
        orientation: orientation as "horizontal" | "vertical",
      }}
    >
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        className={cn(
          "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
          className,
        )}
        {...props}
      />
    </TabsListContext.Provider>
  );
}

function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: TabsVariant;
}) {
  const context = React.useContext(TabsListContext);
  const [indicatorStyle, setIndicatorStyle] =
    React.useState<React.CSSProperties>({});
  const listRef = React.useRef<HTMLDivElement>(null);
  const orientation = context.orientation;

  React.useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return;

      const activeTab = listRef.current.querySelector(
        '[data-state="active"]',
      ) as HTMLElement;
      if (!activeTab) return;

      const listRect = listRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      if (orientation === "horizontal") {
        setIndicatorStyle({
          width: tabRect.width,
          height: variant === "underline" ? "2px" : tabRect.height,
          transform: `translate(${tabRect.left - listRect.left}px, ${tabRect.top - listRect.top}px)`,
        });
      } else {
        setIndicatorStyle({
          width: variant === "underline" ? "2px" : tabRect.width,
          height: tabRect.height,
          transform: `translate(${tabRect.left - listRect.left}px, ${tabRect.top - listRect.top}px)`,
        });
      }
    };

    updateIndicator();

    // Update on window resize
    window.addEventListener("resize", updateIndicator);

    // Use MutationObserver to detect when active tab changes
    const observer = new MutationObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["data-state"],
      });
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [orientation, variant]);

  return (
    <TabsListContext.Provider value={{ variant, orientation }}>
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        className={cn(
          "relative z-0 flex w-fit items-center justify-center gap-x-1 text-muted-foreground",
          "data-[orientation=vertical]:flex-col",
          variant === "default"
            ? "rounded-lg bg-muted p-1"
            : "data-[orientation=horizontal]:py-1.5 data-[orientation=vertical]:px-1.5 *:data-[slot=tabs-trigger]:hover:bg-accent",
          className,
        )}
        {...props}
      >
        {children}
        <div
          data-slot="tab-indicator"
          className={cn(
            "absolute left-0 top-0 transition-[width,height,transform] duration-200 ease-in-out pointer-events-none",
            variant === "underline"
              ? "z-10 bg-primary data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:top-auto data-[orientation=vertical]:right-0 data-[orientation=vertical]:left-auto"
              : "-z-1 rounded-md bg-card shadow-sm border border-border/50",
          )}
          data-orientation={orientation}
          style={indicatorStyle}
        />
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  );
}

function TabsTab({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex flex-1 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:text-foreground data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground",
        "gap-2 px-4 py-2",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        className,
      )}
      {...props}
    />
  );
}

function TabsPanel({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsTab as TabsTrigger,
  TabsPanel,
  TabsPanel as TabsContent,
};
