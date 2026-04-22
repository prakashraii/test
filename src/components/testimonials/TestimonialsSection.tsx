const cardsData = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Aarav Singh",
    handle: "@aaravcodes",
    date: "April 20, 2026",
    quote: "TutorSpark feels smooth and premium. The desktop interactions are seriously impressive.",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Riya Sharma",
    handle: "@riyauidesign",
    date: "May 10, 2026",
    quote: "The Windows 11-inspired layout and glass effects make this portfolio stand out instantly.",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Dev Patel",
    handle: "@devreview",
    date: "June 5, 2026",
    quote: "Loved the taskbar behavior and app window animations. It feels like a mini operating system.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Maya Nair",
    handle: "@maya_builds",
    date: "June 18, 2026",
    quote: "Clean structure, fast loading, and polished UI details. This is a strong portfolio concept.",
  },
];

function TestimonialCard({
  image,
  name,
  handle,
  date,
  quote,
}: {
  image: string;
  name: string;
  handle: string;
  date: string;
  quote: string;
}) {
  return (
    <div className="mx-4 w-72 shrink-0 rounded-lg p-4 shadow transition-all duration-200 hover:shadow-lg">
      <div className="flex gap-2">
        <img className="size-11 rounded-full object-cover" src={image} alt={`${name} profile`} loading="lazy" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{name}</p>
            <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                fill="#2196F3"
              />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{handle}</span>
          <span className="text-[11px] text-slate-400">{date}</span>
        </div>
      </div>
      <p className="pt-4 text-sm text-gray-800">{quote}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const doubledCards = [...cardsData, ...cardsData];

  return (
    <section className="mx-auto mt-16 w-full max-w-6xl scroll-mt-24" id="testimonials">
      <p className="mb-8 text-center text-sm text-slate-500">Real feedback from creators exploring the portfolio OS experience.</p>

      <div className="marquee-row relative mx-auto w-full max-w-5xl overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="marquee-inner flex min-w-[200%] transform-gpu pb-5 pt-10">
          {doubledCards.map((card, index) => (
            <TestimonialCard key={`row1-${card.handle}-${index}`} {...card} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-40" />
      </div>

      <div className="marquee-row relative mx-auto w-full max-w-5xl overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="marquee-inner marquee-reverse flex min-w-[200%] transform-gpu pb-10 pt-5">
          {doubledCards.map((card, index) => (
            <TestimonialCard key={`row2-${card.handle}-${index}`} {...card} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-40" />
      </div>
    </section>
  );
}
