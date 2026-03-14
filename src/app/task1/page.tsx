import { Header } from "@/components/layout/Header";
import { HotSection } from "@/components/hot/HotSection";
import { JourneySection } from "@/components/journey/JourneySection";

export default function Task1Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-0">
          <section className="scroll-mt-24 pt-8">
            <JourneySection />
          </section>
          <section className="scroll-mt-24 mt-16 md:mt-24 pt-8" id="hot">
            <HotSection />
          </section>
        </div>
      </main>
    </>
  );
}
