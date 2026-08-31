"use client";

import { useState } from "react";
import { HeartFilledIcon } from "./icons";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-line-soft transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <a className="font-display text-3xl md:text-4xl text-brand-ink hover:text-brand-accent transition-colors" href="#topo" aria-label="Início">
          Ateliê
        </a>
        <button
          className="md:hidden px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-ink bg-brand-bg-raised border border-brand-line rounded-full hover:bg-brand-bg-inset transition"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav
          id="main-nav"
          className={`flex-col md:flex-row md:items-center gap-4 md:gap-7 absolute md:static top-full left-0 w-full md:w-auto bg-brand-bg md:bg-transparent border-b md:border-b-0 border-brand-line-soft px-6 py-6 md:p-0 transition-all ${
            open ? "flex shadow-lg md:shadow-none" : "hidden md:flex"
          }`}
        >
          <a
            href="#casamentos"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-ink-soft hover:text-brand-accent-strong transition-colors"
            onClick={() => setOpen(false)}
          >
            <HeartFilledIcon className="w-3 h-3 text-brand-accent" />
            Casamentos
          </a>
          <a
            href="#retratos"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-ink-soft hover:text-brand-accent-strong transition-colors"
            onClick={() => setOpen(false)}
          >
            <HeartFilledIcon className="w-3 h-3 text-brand-accent" />
            Retratos
          </a>
          <a
            href="#editorial"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-ink-soft hover:text-brand-accent-strong transition-colors"
            onClick={() => setOpen(false)}
          >
            <HeartFilledIcon className="w-3 h-3 text-brand-accent" />
            Editorial
          </a>
          <a
            href="#sobre"
            className="text-sm font-medium text-brand-ink-soft hover:text-brand-accent-strong transition-colors"
            onClick={() => setOpen(false)}
          >
            Sobre
          </a>
          <a
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-brand-accent-deep text-brand-accent-ink rounded-full hover:bg-brand-accent-strong transition shadow-sm"
            href="#contato"
            onClick={() => setOpen(false)}
          >
            Vamos conversar
          </a>
        </nav>
      </div>
    </header>
  );
}
