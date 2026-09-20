import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import marketingBanner1 from "@/assets/Marketing-banner-deal-1-for-desktop.jpeg";
import marketingBanner2 from "@/assets/marketing-banner-deal-2.jpeg";

const offerImages = [
  { id: "deal-1", src: marketingBanner1, alt: "Burger Mashwi Special Deal 1" },
  { id: "deal-2", src: marketingBanner2, alt: "Burger Mashwi Special Deal 2" },
];

export function OffersBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % offerImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + offerImages.length) % offerImages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  // Touch and drag gesture handling
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      prevSlide();
    }
  };

  const currentImage = offerImages[currentIndex];
  if (!currentImage) return null;

  return (
    <section
      aria-label="Offers"
      className="mx-auto mt-6 max-w-5xl px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EDE3D4] bg-[#F7EFE3] shadow-sm select-none cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? "20%" : "-20%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? "-20%" : "20%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 size-full will-change-[transform,opacity]"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="h-full w-full object-cover pointer-events-none"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle slide indicators */}
        <div className="absolute bottom-3 inset-x-0 z-10 flex justify-center gap-1.5 pointer-events-none">
          {offerImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${
                idx === currentIndex
                  ? "w-6 bg-white shadow-sm"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
