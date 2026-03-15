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
      <main className="min-h-screen py-12 px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          User & Posts Dashboard
        </h1>
        <UserList initialUsers={initialUsers} />
      </main>
    </>
  );
}
