import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const outfit = Outfit({ weight: "400", subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SkillShikshya Journey",
  description: "Your SkillShikshya Journey - Step In. Skill Up. Stand Out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-white text-gray-900 font-[family-name:var(--font-outfit)]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
