"use client";

import useReveal from "@/lib/useReveal";
import { CameraIcon, HeartFilledIcon } from "./icons";
import type { Photo } from "@/lib/types";

interface PhotoFrameProps {
  photo: Photo;
  index: number;
  heart?: boolean; 
  hero?: boolean;
  rotate?: boolean;
}

const rotations = ["", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1", "-rotate-1"];

export default function PhotoFrame({ photo, index, hero = false, rotate = false }: PhotoFrameProps) {
  const [ref, visible] = useReveal<HTMLElement>();

  const indexLabel = "#" + String(index + 1).padStart(2, "0");
  const rotationClass = rotate ? rotations[(index % 5) + 1] : "";

  return (
    <figure
      ref={ref}
      className={`relative group transition-all duration-700 ease-out transform ${rotationClass} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } bg-brand-paper p-3.5 sm:p-4 pb-6 sm:pb-7 rounded-[4px] border border-brand-line-soft/80 shadow-card hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ${
        hero ? "max-w-sm sm:max-w-md w-full mx-auto" : "max-w-xs w-full mx-auto"
      }`}
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-brand-bg-alt/80 backdrop-blur-sm border-l border-r border-dashed border-brand-accent/40 -rotate-1 shadow-sm pointer-events-none z-10"
        aria-hidden="true"
      />

      <span className="absolute top-2.5 right-3 font-hand text-xs text-brand-ink-faint select-none">
        {indexLabel}
      </span>

      <div className="relative overflow-hidden aspect-square w-full rounded-[2px] bg-checkered border border-black/5 shadow-inner">
        {photo.src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photo.src}
            alt={photo.caption || ""}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center text-brand-ink-faint">
            <span className="w-8 h-8 text-brand-accent opacity-70">
              <CameraIcon />
            </span>
            <span className="font-hand text-lg text-brand-accent-deep">{indexLabel}</span>
            <span className="text-xs uppercase tracking-wide max-w-[16ch]">
              substitua — {photo.caption || "foto"}
            </span>
          </div>
        )}
      </div>

      <figcaption className="font-hand text-lg sm:text-xl text-brand-ink-soft text-center mt-3 px-2 line-clamp-2">
        {photo.caption || ""}
      </figcaption>

      {photo.featured && (
        <div className="flex justify-center mt-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-hand font-bold text-brand-accent-deep bg-brand-bg-inset px-2.5 py-0.5 rounded-full shadow-sm">
            <HeartFilledIcon className="w-3 h-3 text-brand-accent-deep" /> favorita
          </span>
        </div>
      )}
    </figure>
  );
}

