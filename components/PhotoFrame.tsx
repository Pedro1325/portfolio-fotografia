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

/*
  PhotoFrame — the shared photo component: heart-crop (one per section,
  the "featured" photo) or polaroid-with-tape (the rest). Fades/slides in
  once scrolled into view, respecting prefers-reduced-motion.
*/
export default function PhotoFrame({ photo, index, heart = false, hero = false, rotate = false }: PhotoFrameProps) {
  const [ref, visible] = useReveal<HTMLElement>();

  const indexLabel = "#" + String(index + 1).padStart(2, "0");
  const rotClass = rotate ? " frame--rot" + ((index % 5) + 1) : "";
  const classes =
    "frame" + rotClass + (hero ? " frame--hero" : "") + (heart ? " frame--heart" : "") + (visible ? " is-visible" : "");

  return (
    <figure ref={ref} className={classes}>
      {!heart && <span className="frame__tape" aria-hidden="true" />}
      <span className="frame__tag">{indexLabel}</span>
      <div className={"frame__media" + (heart ? " frame__media--heart" : "")}>
        {photo.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.caption || ""} loading="lazy" />
        ) : (
          <div className="frame__placeholder">
            <span className="frame__ph-icon">
              <CameraIcon />
            </span>
            <span className="frame__ph-index">{indexLabel}</span>
            <span className="frame__ph-label">substitua — {photo.caption || "foto"}</span>
          </div>
        )}
      </div>
      <figcaption className="frame__caption">{photo.caption || ""}</figcaption>
      <span className="frame__stamp">
        <HeartFilledIcon /> favorita
      </span>
    </figure>
  );
}
