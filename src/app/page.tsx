import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            SkillShikshya Journey
          </h1>
          <p className="text-gray-600 mb-12">
            Step In. Skill Up. Stand Out.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/task1"
              className="group block p-8 rounded-3xl bg-gray-50 hover:bg-rose-50 border-2 border-transparent hover:border-rose-200 transition-all duration-300 text-left"
            >
              <span className="text-sm font-medium text-rose-600 uppercase tracking-wide">
                Task 1
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-rose-700">
                Journey
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Explore our journey cards with hover animations and rich content.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-rose-600 font-medium text-sm group-hover:gap-2 transition-all">
                Open Task 1
                <span aria-hidden>→</span>
              </span>
            </Link>
            <Link
              href="/task2"
              className="group block p-8 rounded-3xl bg-gray-50 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-200 transition-all duration-300 text-left"
            >
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                Task 2
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-emerald-700">
                What&apos;s Hot Right Now
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Course overview with statistic cards. Click cards to view animations.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-emerald-600 font-medium text-sm group-hover:gap-2 transition-all">
                Open Task 2
                <span aria-hidden>→</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
