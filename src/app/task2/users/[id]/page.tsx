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
        <main className="min-h-screen py-12 px-4 md:px-8 bg-[#A88964]">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-red-200 font-medium">Invalid user ID.</p>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <Header />
      <main className="min-h-screen py-10 md:py-14 px-4 md:px-8 bg-[#A88964]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            User Posts
          </h1>
          <UserPostsView userId={userId} />
        </div>
      </main>
    </>
  );
}
