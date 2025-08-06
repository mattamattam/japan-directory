"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface HorizontalCarouselProps {
  children: ReactNode[];
  itemsToScroll?: number;
  className?: string;
}

export default function HorizontalCarousel({
  children,
  itemsToScroll = 3,
  className = "",
}: HorizontalCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateScrollButtons = useCallback(() => {
    // With infinite scroll, buttons are always enabled unless there are no items
    // Use requestAnimationFrame to avoid blocking the main thread
    requestAnimationFrame(() => {
      setCanScrollLeft(children.length > 0);
      setCanScrollRight(children.length > 0);
    });
  }, [children.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    
    const handleScroll = () => updateScrollButtons();
    container.addEventListener("scroll", handleScroll);
    
    // Handle resize
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [children, updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const cardWidth = 320; // Approximate card width + gap
    const scrollAmount = cardWidth * itemsToScroll;
    
    const currentScrollLeft = container.scrollLeft;
    const totalWidth = container.scrollWidth;
    const viewWidth = container.clientWidth;
    const halfWidth = (totalWidth - viewWidth) / 2; // Position of second set of items
    
    let targetScrollLeft: number;
    
    if (direction === "right") {
      targetScrollLeft = currentScrollLeft + scrollAmount;
      
      // If we've scrolled past the first set of items, reset to beginning seamlessly
      if (currentScrollLeft >= halfWidth) {
        container.scrollLeft = currentScrollLeft - halfWidth;
        targetScrollLeft = container.scrollLeft + scrollAmount;
      }
    } else {
      targetScrollLeft = currentScrollLeft - scrollAmount;
      
      // If we're scrolling before the beginning, jump to the equivalent position in the second set
      if (targetScrollLeft < 0) {
        container.scrollLeft = currentScrollLeft + halfWidth;
        targetScrollLeft = container.scrollLeft - scrollAmount;
      }
    }

    // Smooth scroll with fast glide and smooth stop
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
      updateScrollButtons();
    }, 600);
  };

  if (children.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Arrows */}
      <div className="absolute -top-12 right-0 z-10 flex space-x-2">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft || isScrolling}
          className={`p-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
            !canScrollLeft || isScrolling
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight || isScrolling}
          className={`p-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
            !canScrollRight || isScrolling
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex space-x-6 pb-2" style={{ minWidth: "max-content" }}>
          {/* Render children twice for seamless infinite scroll */}
          {children.map((child, index) => (
            <div key={`first-${index}`} className="flex-none w-80">
              {child}
            </div>
          ))}
          {children.map((child, index) => (
            <div key={`second-${index}`} className="flex-none w-80">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}