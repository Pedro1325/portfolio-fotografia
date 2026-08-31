"use client";

import type { ElementType, ReactNode } from "react";
import useReveal from "@/lib/useReveal";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  // Reveal is intentionally polymorphic (renders div/h2/svg/table/...);
  // typing every possible tag's own prop set isn't worth it here, so the
  // rest just pass through to whichever element `as` resolves to.
  [key: string]: unknown;
}

/*
  Reveal — generic fade/slide-in wrapper for any element, mirroring the
  original data-reveal attribute. Pass `as` for a non-div tag (e.g. "svg",
  "table", "h2").

  `Tag` is deliberately untyped (cast to `any`) below: a truly polymorphic
  "renders whatever tag you pass, with a ref, plus arbitrary passthrough
  props" component doesn't have a clean strict-mode TS shape without a lot
  of ceremony for a small utility component — see React's own docs on the
  tradeoffs of polymorphic "as" props.
*/
export default function Reveal({ as: Tag = "div", className = "", children, ...props }: RevealProps) {
  const [ref, visible] = useReveal<Element>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component ref={ref} className={className + (visible ? " is-visible" : "")} {...props}>
      {children}
    </Component>
  );
}
