import type { CSSProperties } from "react";
import { apps, type App, type StoreLink } from "./apps";

const year = new Date().getFullYear();

const services = [
  {
    tag: "01",
    title: "Apps nativos",
    text: "iOS e Android com uma base só, widgets, notificações e publicação nas lojas.",
    stack: "React Native · Expo · Swift · Kotlin",
  },
  {
    tag: "02",
    title: "Web",
    text: "Sites, painéis e aplicações web rápidas, com mapas, 3D e mídia quando o produto pede.",
    stack: "Next.js · React · Vite · Mapbox",
  },
  {
    tag: "03",
    title: "Back-end e infraestrutura",
    text: "APIs, banco de dados, armazenamento de mídia e deploy contínuo em containers.",
    stack: "Node · SQLite · Docker · CI/CD",
  },
  {
    tag: "04",
    title: "Produto e crescimento",
    text: "Assinaturas, anúncios, métricas e campanhas para o app chegar e ficar no bolso das pessoas.",
    stack: "RevenueCat · AdMob · Meta · Analytics",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section className="section" id="produtos">
          <SectionHead
            label="Produtos"
            title="Apps que construímos e mantemos."
            text="Produtos próprios, publicados e em uso. Cada um com seu público e seu jeito, todos com o mesmo cuidado de engenharia."
          />
          <div className="products">
            {apps.map((app, i) => (
              <Product key={app.id} app={app} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
        <section className="section" id="servicos">
          <SectionHead
            label="O que fazemos"
            title="Do primeiro protótipo à loja, e depois dela."
            text="Projetamos, desenvolvemos e operamos software de ponta a ponta, para qualquer área."
          />
          <div className="services">
            {services.map((s) => (
              <article key={s.tag} className="service">
                <span className="service-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="service-stack">{s.stack}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="brand" aria-label="FRESAN, início">
        <Logo />
        FRESAN
      </a>
      <nav aria-label="Seções">
        <a href="#produtos">Produtos</a>
        <a href="#servicos">O que fazemos</a>
      </nav>
    </header>
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

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="grid-bg" aria-hidden />
      <p className="pill">
        <span className="dot" /> {apps.length} produtos no ar
      </p>
      <h1>
        Software que vira
        <br />
        <span className="muted">produto de verdade.</span>
      </h1>
      <p className="hero-lead">
        A FRESAN é um estúdio de tecnologia que cria apps para iOS, Android e web, da ideia à publicação, e cuida
        deles depois do lançamento.
      </p>
      <div className="hero-cta">
        <a className="btn btn-dark" href="#produtos">
          Ver produtos
        </a>
        <a className="btn btn-line" href="#servicos">
          O que fazemos
        </a>
      </div>

      <div className="hero-apps" aria-label="Produtos">
        {apps.map((a) => (
          <a key={a.id} href={`#${a.id}`} className="hero-app" style={{ "--accent": a.accent } as CSSProperties}>
            <img src={a.icon} alt="" width={40} height={40} />
            <span>
              <strong>{a.name}</strong>
              <small>{a.kicker}</small>
            </span>
          </a>
        ))}
      </div>

      <dl className="metrics">
        <div>
          <dt>4,9★</dt>
          <dd>AeroMet na App Store</dd>
        </div>
        <div>
          <dt>700+</dt>
          <dd>avaliações de usuários</dd>
        </div>
        <div>
          <dt>3</dt>
          <dd>plataformas: iOS, Android e web</dd>
        </div>
      </dl>
    </section>
  );
}

function SectionHead({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="section-head">
      <p className="label">{label}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Product({ app, flip }: { app: App; flip: boolean }) {
  return (
    <article id={app.id} className={`product ${flip ? "flip" : ""}`} style={{ "--accent": app.accent } as CSSProperties}>
      <div className="product-copy">
        <div className="product-head">
          <img src={app.icon} alt="" width={48} height={48} />
          <div>
            <h3>{app.name}</h3>
            <span className="product-meta">{app.kicker}</span>
          </div>
        </div>
        <p className="product-title">{app.title}</p>
        <p className="product-lead">{app.lead}</p>
        <ul className="features">
          {app.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
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
      <div className="product-visual">{app.shots.length ? <Phones app={app} /> : <Globe />}</div>
    </article>
  );
}

function Phones({ app }: { app: App }) {
  return (
    <div className="phones">
      {app.shots.map((src, i) => (
        <figure key={src} className={`phone phone-${i + 1}`}>
          <img src={src} alt={`Tela do ${app.name}`} loading="lazy" />
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

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="brand">
          <Logo />
          FRESAN
        </a>
        <nav aria-label="Rodapé">
          {apps.map((a) => (
            <a key={a.id} href={`#${a.id}`}>
              {a.name}
            </a>
          ))}
        </nav>
        <p>© {year} FRESAN</p>
      </div>
    </footer>
  );
}
