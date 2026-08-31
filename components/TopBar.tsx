"use client";

import { useState } from "react";
import { HeartFilledIcon } from "./icons";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-bar">
      <div className="top-bar__inner">
        <a className="top-bar__mark" href="#topo" aria-label="Início">
          Ateliê
        </a>
        <button
          className="top-bar__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav id="main-nav" className={"main-nav" + (open ? " is-open" : "")}>
          <a href="#casamentos" onClick={() => setOpen(false)}>
            <HeartFilledIcon className="main-nav__dot" />
            Casamentos
          </a>
          <a href="#retratos" onClick={() => setOpen(false)}>
            <HeartFilledIcon className="main-nav__dot" />
            Retratos
          </a>
          <a href="#editorial" onClick={() => setOpen(false)}>
            <HeartFilledIcon className="main-nav__dot" />
            Editorial
          </a>
          <a href="#sobre" onClick={() => setOpen(false)}>
            Sobre
          </a>
          <a className="main-nav__cta" href="#contato" onClick={() => setOpen(false)}>
            Vamos conversar
          </a>
        </nav>
      </div>
    </header>
  );
}
