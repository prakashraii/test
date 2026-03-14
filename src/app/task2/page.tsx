import { Header } from "@/components/layout/Header";
import { UserList } from "@/components/task2/UserList";

export default function Task2Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          User & Posts Dashboard
        </h1>
        <UserList />
      </main>
    </>
  );
}
