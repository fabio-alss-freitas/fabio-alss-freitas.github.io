"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { apps, type App, type StoreLink } from "./apps";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const app = apps[index];

  const go = (step: number) => setIndex((i) => (i + step + apps.length) % apps.length);

  // Abre no app do link (#orbify) e mantém o endereço em dia ao trocar.
  useEffect(() => {
    const i = apps.findIndex((a) => `#${a.id}` === location.hash);
    if (i > 0) setIndex(i);
  }, []);
  useEffect(() => {
    history.replaceState(null, "", index === 0 ? location.pathname : `#${app.id}`);
  }, [index, app.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="stage"
      style={{ "--accent": app.accent } as CSSProperties}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="grid-bg" aria-hidden />

      <header className="top">
        <span className="brand">
          <Logo />
          FRESAN
        </span>
        <p className="tagline">Desenvolvedor independente criando soluções para o dia a dia.</p>
      </header>

      <main className="slides" aria-roledescription="carrossel" aria-label="Apps">
        {apps.map((a, i) => (
          <Slide key={a.id} app={a} active={i === index} />
        ))}
      </main>

      <nav className="controls" aria-label="Trocar de app">
        <button className="arrow" onClick={() => go(-1)} aria-label="App anterior">
          <Chevron dir="left" />
        </button>
        <div className="tabs" role="tablist">
          {apps.map((a, i) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={i === index}
              className="tab"
              style={{ "--tab": a.accent } as CSSProperties}
              onClick={() => setIndex(i)}
            >
              <img src={a.icon} alt="" width={22} height={22} />
              <span>{a.name}</span>
            </button>
          ))}
        </div>
        <button className="arrow" onClick={() => go(1)} aria-label="Próximo app">
          <Chevron dir="right" />
        </button>
      </nav>
    </div>
  );
}

function Slide({ app, active }: { app: App; active: boolean }) {
  return (
    <article className={`slide ${active ? "is-active" : ""}`} aria-hidden={!active} inert={!active}>
      <div className="slide-copy">
        <div className="slide-head">
          <img src={app.icon} alt="" width={56} height={56} />
          <div>
            <h1>{app.name}</h1>
            <span className="meta">{app.kicker}</span>
          </div>
        </div>
        <p className="slide-title">{app.title}</p>
        <p className="slide-lead">{app.lead}</p>
        <div className="stores">
          {app.links.map((l) => (
            <StoreButton key={l.href} link={l} />
          ))}
        </div>
        <p className="note">
          <span className="chip">{app.platforms}</span>
          {app.note}
        </p>
        {app.extra && (
          <p className="extra">
            {app.extra.map((e) => (
              <a key={e.href} href={e.href}>
                {e.label}
              </a>
            ))}
          </p>
        )}
      </div>
      <div className="slide-visual">{app.shots.length ? <Phones app={app} /> : <Globe />}</div>
    </article>
  );
}

function Phones({ app }: { app: App }) {
  return (
    <div className="phones">
      {app.shots.map((src, i) => (
        <figure key={src} className={`phone phone-${i + 1}`}>
          <img src={src} alt={`Tela do ${app.name}`} />
        </figure>
      ))}
    </div>
  );
}

// Ilustração do Orbify: um globo com memórias presas na superfície.
function Globe() {
  const pins = [
    { x: 30, y: 34, r: -8, c: "linear-gradient(160deg,#f6b26b,#c0577a)" },
    { x: 64, y: 28, r: 6, c: "linear-gradient(160deg,#9fd8ff,#3f6fd1)" },
    { x: 70, y: 60, r: -4, c: "linear-gradient(160deg,#b8f2c8,#2a9d8f)" },
    { x: 40, y: 66, r: 9, c: "linear-gradient(160deg,#ffe29a,#f08a4b)" },
  ];
  return (
    <div className="globe" aria-hidden>
      <svg viewBox="0 0 200 200" className="graticule">
        {[30, 55, 80].map((ry) => (
          <ellipse key={ry} cx="100" cy="100" rx="98" ry={ry} />
        ))}
        {[20, 50, 80].map((rx) => (
          <ellipse key={rx} cx="100" cy="100" rx={rx} ry="98" />
        ))}
        <line x1="100" y1="2" x2="100" y2="198" />
        <line x1="2" y1="100" x2="198" y2="100" />
        <path d="M60 68 Q 100 24 128 56" className="arc" />
        <path d="M128 56 Q 152 92 140 120" className="arc" />
        <path d="M140 120 Q 110 154 80 132" className="arc" />
      </svg>
      {pins.map((p, i) => (
        <div
          key={i}
          className="pin"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%,-50%) rotate(${p.r}deg)`, animationDelay: `${i * 0.8}s` }}
        >
          <div className="pin-photo" style={{ background: p.c }} />
        </div>
      ))}
    </div>
  );
}

function StoreButton({ link }: { link: StoreLink }) {
  const label =
    link.label ?? (link.kind === "appstore" ? "App Store" : link.kind === "play" ? "Google Play" : "Abrir");
  const pre = link.kind === "appstore" ? "Baixar na" : link.kind === "play" ? "Disponível no" : "Na web";
  return (
    <a className="store" href={link.href} target="_blank" rel="noopener">
      {link.kind === "appstore" && (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            fill="currentColor"
            d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"
          />
        </svg>
      )}
      {link.kind === "play" && (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
          <path fill="#34a853" d="M3.6 2.3 13.3 12l-9.7 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" />
          <path fill="#fbbc04" d="m16.6 15.3-3.3-3.3 3.3-3.3 3.7 2.1c1 .6 1 1.8 0 2.4z" />
          <path fill="#ea4335" d="M16.6 15.3 13.3 12l-9.7 9.7c.4.2.9.2 1.4-.1z" />
          <path fill="#4285f4" d="M16.6 8.7 5 2.4c-.5-.3-1-.3-1.4-.1l9.7 9.7z" />
        </svg>
      )}
      {link.kind === "web" && (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )}
      <span>
        <small>{pre}</small>
        {label}
      </span>
    </a>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" />
      <path d="M8 17V7h8M8 12h6" stroke="var(--bg)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
