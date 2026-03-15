import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-10 md:py-14 px-4 md:px-8 bg-[#A88964]">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <Link
              href="/task1"
              className="group relative block p-8 md:p-10 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200/60 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-600/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 text-left overflow-hidden"
            >
              <span className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-amber-400/40 dark:bg-amber-500/30 flex items-center justify-center text-amber-800 dark:text-amber-300 text-xl font-bold group-hover:scale-110 transition-transform">
                →
              </span>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Task 1
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors">
                Journey
              </h2>
              <p className="text-gray-800 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                Explore our journey cards with hover animations and rich
                content.
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-amber-800 dark:text-amber-300 font-semibold text-sm group-hover:gap-3 transition-all underline decoration-amber-800/50 dark:decoration-amber-300/50 underline-offset-2">
                Open Task 1
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
              </span>
            </Link>

            <Link
              href="/task2"
              className="group relative block p-8 md:p-10 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40 border border-violet-200/60 dark:border-violet-800/50 hover:border-violet-300 dark:hover:border-violet-600/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 text-left overflow-hidden"
            >
              <span className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-violet-400/40 dark:bg-violet-500/30 flex items-center justify-center text-violet-800 dark:text-violet-300 text-xl font-bold group-hover:scale-110 transition-transform">
                →
              </span>
              <span className="text-xs font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Task 2
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 group-hover:text-violet-900 dark:group-hover:text-violet-200 transition-colors">
                Dashboard
              </h2>
              <p className="text-gray-800 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                View users and their posts. Search, filter, and manage
                activity in one place.
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-violet-800 dark:text-violet-300 font-semibold text-sm group-hover:gap-3 transition-all underline decoration-violet-800/50 dark:decoration-violet-300/50 underline-offset-2">
                Open Dashboard
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
