import { Button } from "@workspace/ui/components/button";
import { logout } from "@/lib/actions";
import { verifySession } from "@/lib/dal";

export async function Nav() {
  const session = await verifySession();

  if (!session) return null;

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Hello, Admin</span>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}
