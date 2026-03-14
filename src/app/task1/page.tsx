import { Header } from "@/components/layout/Header";
import { JourneySection } from "@/components/journey/JourneySection";

export default function Task1Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 md:px-8">
        <section className="scroll-mt-24 pt-8">
          <JourneySection />
        </section>
      </main>
    </>
  );
}
