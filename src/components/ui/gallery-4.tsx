"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  viewAllText?: string;
  viewAllHref?: string;
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items,
  viewAllText,
  viewAllHref,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Mouse wheel scroll support
  useEffect(() => {
    if (!carouselApi) return;

    const container = carouselApi.containerNode();
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const deltaY = Math.abs(e.deltaY);
      const deltaX = Math.abs(e.deltaX);

      // Only handle if horizontal scroll is dominant (or shift key is pressed)
      // This allows normal vertical page scrolling to work
      const isHorizontalScroll = deltaX > deltaY;
      const isShiftScroll = e.shiftKey && deltaY > 0;

      if (isHorizontalScroll || isShiftScroll) {
        e.preventDefault();
        e.stopPropagation();
        isScrolling = true;

        if (e.deltaX > 0 || e.deltaY > 0) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollPrev();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
      // If vertical scroll is dominant, do nothing - let it scroll the page naturally
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [carouselApi]);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-transparent relative z-10">
      <div className="container mx-auto">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="max-w-lg text-gray-600 dark:text-white/70">{description}</p>
            </div>
            <div className="hidden shrink-0 gap-2 md:flex" style={{ position: 'relative', zIndex: 100 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Prev clicked');
                  carouselApi?.scrollPrev();
                }}
                disabled={!canScrollPrev}
                className="disabled:opacity-30 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <ArrowLeft className="size-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Next clicked');
                  carouselApi?.scrollNext();
                }}
                disabled={!canScrollNext}
                className="disabled:opacity-30 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <ArrowRight className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-2 md:pl-4 basis-[85%] md:basis-[45%] lg:basis-[30%]"
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative h-full min-h-[400px] overflow-hidden rounded-xl border border-gray-300 dark:border-transparent">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent dark:from-primary/95 dark:via-primary/60" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mb-2 text-xl font-semibold">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 text-white/80">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm text-gray-200 dark:text-accent font-semibold">
                        Visit Website{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-gray-700 dark:bg-accent w-8" : "bg-gray-300 dark:bg-white/20 w-2"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        {viewAllText && viewAllHref && (
          <div className="mt-16 text-center">
            <a
              href={viewAllHref}
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-900 dark:border-accent text-gray-900 dark:text-accent hover:bg-gray-900 dark:hover:bg-accent hover:text-white dark:hover:text-primary transition-all duration-300 rounded-full font-semibold"
            >
              {viewAllText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export { Gallery4 };
