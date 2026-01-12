import { MainNav } from "@/components/nav/main-nav";
import { UserNav } from "@/components/nav/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-sidebar lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center border-b px-4 lg:h-16 lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                M
              </div>
              <span className="text-lg">Admin Dashboard</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto py-4">
            <div className="px-3 py-2">
              <MainNav />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-sidebar px-4 lg:h-16 lg:px-6">
          <div className="flex-1" />
          <UserNav />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
