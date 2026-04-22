import { TuitionHeroSection } from "@/components/hero/TuitionHeroSection";
import { HotSection } from "@/components/hot/HotSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { Footer } from "@/components/layout/Footer";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-12 px-4 md:px-8">
      <div className=" mx-20 flex flex-col gap-0">
        <section className="scroll-mt-24 pt-6 md:pt-8" id="home">
          <TuitionHeroSection />
        </section>
        <section className="scroll-mt-24 pt-8" id="journey">
          <JourneySection />
        </section>
        <section className="scroll-mt-24 mt-16 md:mt-24 pt-8" id="hot">
          <HotSection />
        </section>
        <section className="scroll-mt-24 pt-6" id="testimonials">
          <TestimonialsSection />
        </section>
      </div>
      <Footer />
    </main>
  );
}
