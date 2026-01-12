import { SidebarTrigger } from "@workspace/ui/components/sidebar";

export function SiteHeader() {
  return (
    <header className="flex shrink-0 items-center gap-3 py-3 px-4 lg:px-6 border-b">
      <SidebarTrigger />
    </header>
  );
}