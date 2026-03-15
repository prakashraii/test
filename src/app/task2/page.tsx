import { Header } from "@/components/layout/Header";
import { UserList } from "@/components/task2/UserList";
import { fetchUsers } from "@/lib/api";

export default async function Task2Page() {
  let initialUsers: Awaited<ReturnType<typeof fetchUsers>> = [];
  try {
    initialUsers = await fetchUsers();
  } catch {
    // Client will refetch and show error if needed
  }
  return (
    <>
      <Header />
      <main className="min-h-screen py-10 md:py-14 px-4 md:px-8 bg-[#A88964]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 md:mb-10 text-white">
            <p className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Users & Posts
            </h1>
            <p className="text-white/95 mt-2 max-w-xl">
              View users, search by name or email, and open a profile to see their posts.
            </p>
          </div>
          <UserList initialUsers={initialUsers} />
        </div>
      </main>
    </>
  );
}
