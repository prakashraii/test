"use client";

import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#journey" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "Pricing", href: "#hot" },
  { label: "Resources", href: "#footer" },
];

export function TuitionHeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/dot-pattern-redical.svg)] bg-cover bg-center px-4 pb-16 text-sm text-slate-800 md:px-16 lg:px-24 xl:px-32">
      <nav className="relative flex w-full items-center justify-between border-b border-white/25 p-4">
        <a href="#" className="text-2xl font-semibold tracking-tight text-slate-900">
          TutorSpark
        </a>

        <ul
          className={`max-md:absolute max-md:top-0 max-md:z-50 max-md:h-full max-md:w-full max-md:backdrop-blur max-md:bg-white/70 max-md:text-base flex flex-col items-center justify-center gap-8 font-medium transition-all duration-300 md:flex-row ${
            isMenuOpen ? "max-md:left-0" : "max-md:-left-full"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.label} className="hover:text-slate-500" onClick={() => setIsMenuOpen(false)}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}

          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md bg-gray-800 p-2 font-medium text-white transition hover:bg-black md:hidden"
            aria-label="Close navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button className="hidden rounded-full bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 md:block">
          View Plans
        </button>
      </nav>

      <div className="mt-20 flex w-full flex-col items-center justify-between gap-16 lg:mt-24 lg:flex-row lg:gap-20">
        <div className="lg:w-1/2">
          <p className="mb-4 inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Live Tuition Platform
          </p>
          <h1 className="max-w-xl bg-gradient-to-r from-black to-slate-600 bg-clip-text text-5xl font-semibold leading-tight text-transparent md:text-[54px] md:leading-[4.2rem]">
            Learn smarter with expert tutors and daily progress tracking
          </h1>
          <p className="mt-4 max-w-md text-sm/7 text-slate-500">
            Join interactive classes, revision quizzes, and 1:1 mentorship designed for school and college learners.
          </p>

          <div className="mt-6 flex h-[54px] max-w-md items-center rounded-md border border-slate-300 text-sm focus-within:border-indigo-600">
            <input
              type="email"
              placeholder="Enter your email for a free demo"
              className="h-full w-full rounded-md px-4 outline-none"
            />
            <button className="mr-1 flex h-[46px] items-center justify-center rounded-md bg-indigo-600 px-6 text-white transition hover:bg-indigo-700">
              Book Trial
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-600">Trusted by students preparing for boards, JEE, NEET, and more.</p>

          <div className="mt-9 flex items-center">
            <div className="flex -space-x-3.5 pr-3">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="Student avatar"
                className="size-10 rounded-full border-2 border-white transition hover:-translate-y-px"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="Student avatar"
                className="size-10 rounded-full border-2 border-white transition hover:-translate-y-px"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Student avatar"
                className="size-10 rounded-full border-2 border-white transition hover:-translate-y-px"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
                alt="Student avatar"
                className="size-10 rounded-full border-2 border-white transition hover:-translate-y-px"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">{"★★★★★"}</div>
              <p className="text-sm text-slate-500">Used by 10,000+ students</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-r from-[#661FFF] via-[#FF1994] to-[#2D73FF] opacity-50 blur-2xl" />
          <img
            className="max-h-[560px] w-full max-w-md rounded-[40px] md:mr-10"
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=450&h=560&auto=format&fit=crop"
            alt="Online tutoring class"
          />
        </div>
      </div>
    </section>
  );
}
