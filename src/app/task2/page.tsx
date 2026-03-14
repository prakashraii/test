import { Header } from "@/components/layout/Header";
import { HotSection } from "@/components/hot/HotSection";

export default function Task2Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 md:px-8">
        <HotSection />
      </main>
    </>
  );
}
