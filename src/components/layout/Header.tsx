"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/task1", label: "Task 1 (Journey)" },
  { href: "/task2", label: "Dashboard" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-[#A88964] shadow-lg shadow-black/10 rounded-b-2xl">
      <nav className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-white hover:text-white/90 transition-colors duration-200"
        >
          <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-sm font-extrabold shadow-md">
            S
          </span>
          SkillShikshya
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-white
                  ${isActive
                    ? "bg-white/25"
                    : "hover:bg-white/15"
                  }
                `}
              >
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
