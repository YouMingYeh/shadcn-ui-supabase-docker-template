"use client";

import Link from "next/link";
import {
  Settings,
  Squircle,
  Home,
} from "lucide-react";
import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
] as const;

const SECONDARY_NAV_ITEMS = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
] as const;

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Squircle className="size-5" />
                <span className="text-base font-semibold">App</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
        <NavSecondary items={SECONDARY_NAV_ITEMS} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
