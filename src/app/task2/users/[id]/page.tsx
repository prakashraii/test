import { Header } from "@/components/layout/Header";
import { UserPostsView } from "@/components/task2/UserPostsView";

export default function UserPostsPage({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  if (Number.isNaN(userId)) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 px-4 md:px-8">
          <p className="text-red-600">Invalid user ID.</p>
        </main>
      </>
    );
  }
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          User {userId} — Posts
        </h1>
        <UserPostsView userId={userId} />
      </main>
    </>
  );
}
