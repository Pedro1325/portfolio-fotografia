"use client";

import type { ElementType, ReactNode } from "react";
import useReveal from "@/lib/useReveal";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}
export default function Reveal({ as: Tag = "div", className = "", children, ...props }: RevealProps) {
  const [ref, visible] = useReveal<Element>();

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
