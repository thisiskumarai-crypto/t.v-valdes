"use client";

import { useState, useRef, useEffect } from "react";

type Page = "home" | "servicios" | "empresa" | "testimonios" | "contacto";

const globalStyle = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500&f[]=instrument-serif@400,400i&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bl: #1A4AC8;
    --bl2: #2057E0;
    --dk: #090B0F;
    --bg: #EEF2F7;
    --bg2: #E2E9F3;
    --mid: #506070;
    --pale: #8098B0;
    --cr: #EEF3FA;
    --line: rgba(26,74,200,.12);
    --serif: 'Instrument Serif', Georgia, serif;
    --sans: 'Satoshi', system-ui, sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--sans); font-weight: 300; background: var(--bg); color: var(--dk); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--bl); }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
  @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

/* ─── SHARED COMPONENTS ─── */
function Nav({ current, navigate }: { current: Page; navigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Servicios", page: "servicios" },
    { label: "Empresa", page: "empresa" },
    { label: "Opiniones", page: "testimonios" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(238,242,247,.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--line)", padding: "0 2.5rem",
      height: 52, display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <a href="#" onClick={e => { e.preventDefault(); navigate("home"); setOpen(false); }} style={{
        fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 400,
        color: "var(--dk)", textDecoration: "none", letterSpacing: ".01em"
      }}>
        T.<span style={{ color: "var(--bl)" }}>Valdés</span> S.L.
      </a>
      <ul style={{ display: "flex", alignItems: "center", gap: "1.5rem", listStyle: "none" }} className="nav-desktop">
        {links.map(l => (
          <li key={l.page}>
            <a href="#" onClick={e => { e.preventDefault(); navigate(l.page); }}
              style={{
                fontSize: ".7rem", fontWeight: 400, letterSpacing: ".08em",
                textTransform: "uppercase", color: current === l.page ? "var(--bl)" : "var(--mid)",
                textDecoration: "none", transition: "color .2s"
              }}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#" onClick={e => { e.preventDefault(); navigate("contacto"); }}
            style={{
              fontSize: ".7rem", fontWeight: 400, letterSpacing: ".08em",
              textTransform: "uppercase", background: "var(--bl)", color: "#fff",
              padding: ".35rem 1rem", borderRadius: 100, textDecoration: "none"
            }}>Contactar</a>
        </li>
      </ul>
      <button onClick={() => setOpen(!open)} style={{
        display: "none", background: "none", border: "none", cursor: "pointer",
        flexDirection: "column", gap: 5, padding: ".3rem"
      }} className="nav-toggle-btn">
        {[0, 1, 2].map(i => (
          <span key={i} style={{ display: "block", width: 20, height: 1.5, background: "var(--dk)" }} />
        ))}
      </button>
      {open && (
        <div style={{
          position: "fixed", top: 52, left: 0, right: 0, bottom: 0,
          background: "var(--bg)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem", zIndex: 99
        }}>
          {[...links, { label: "Contactar", page: "contacto" as Page }].map(l => (
            <a key={l.page} href="#" onClick={e => { e.preventDefault(); navigate(l.page); setOpen(false); }}
              style={{
                fontSize: "1.1rem", fontWeight: 400, letterSpacing: ".08em",
                textTransform: "uppercase", color: current === l.page ? "var(--bl)" : "var(--mid)",
                textDecoration: "none"
              }}>{l.label}</a>
          ))}
        </div>
      )}
      <style>{`
        @media(max-width:1024px){
          .nav-desktop{display:none!important}
          .nav-toggle-btn{display:flex!important}
        }
      `}</style>
    </nav>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer style={{ background: "var(--dk)", padding: "2.5rem 2.5rem 1.5rem" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem",
        paddingBottom: "2rem", borderBottom: "1px solid rgba(238,243,250,.06)"
      }} className="footer-grid">
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--cr)" }}>
            T.<span style={{ color: "var(--bl2)" }}>Valdés</span> S.L.
          </div>
          <div style={{ fontSize: ".72rem", color: "rgba(238,243,250,.2)", marginTop: ".4rem", lineHeight: 1.6 }}>
            Fontanería · Calefacción · Gas · Reformas<br />
            C. Diego Laínez, 4 Bajo · 09005 Burgos
          </div>
        </div>
        {[
          { title: "Servicios", links: [["Calderas y calefacción","servicios"],["Fontanería","servicios"],["Gas","servicios"],["Reformas","servicios"]] },
          { title: "Empresa", links: [["Quiénes somos","empresa"],["Opiniones","testimonios"]] },
          { title: "Contacto", links: [["947 229 808","contacto"],["WhatsApp 653 868 490","contacto"],["Formulario","contacto"]] },
        ].map(col => (
          <div key={col.title}>
            <h5 style={{ fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(238,243,250,.2)", marginBottom: "1rem" }}>{col.title}</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {col.links.map(([label, page]) => (
                <li key={label}>
                  <a href="#" onClick={e => { e.preventDefault(); navigate(page as Page); }}
                    style={{ fontSize: ".78rem", color: "rgba(238,243,250,.28)", textDecoration: "none" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1.5rem", flexWrap: "wrap", gap: ".5rem" }}>
        <p style={{ fontSize: ".68rem", color: "rgba(238,243,250,.14)" }}>© 2025 T. Valdés S.L. — Todos los derechos reservados.</p>
        <p style={{ fontSize: ".68rem", color: "rgba(238,243,250,.14)" }}>Fundada en 1987 · Burgos, España</p>
      </div>
      <style>{`@media(max-width:1024px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important}}`}</style>
    </footer>
  );
}

function Fab() {
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 200 }}>
      <a href="tel:947229808" style={{
        width: 46, height: 46, background: "var(--bl)", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none", boxShadow: "0 6px 24px rgba(26,74,200,.4)"
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.28a16 16 0 0 0 6.29 6.29l.89-.89a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
}

function SectionLabel({ children, style: s }: { children: string; style?: React.CSSProperties }) {
  return <span style={{ fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase" as const, color: "var(--bl)", marginBottom: "1rem", display: "block", ...s }}>{children}</span>;
}

function SectionTitle({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{
      fontFamily: "var(--serif)", fontSize: "clamp(1.5rem,2.8vw,2.4rem)", fontWeight: 400,
      letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: ".8rem",
      color: dark ? "var(--cr)" : "var(--dk)"
    }}>{children}</h2>
  );
}

function Em({ children }: { children: string }) {
  return <em style={{ fontStyle: "italic", color: "var(--bl)" }}>{children}</em>;
}

function PageHeader({ breadcrumb, title, desc }: {
  breadcrumb: string; title: React.ReactNode; desc?: string;
}) {
  return (
    <div style={{ background: "var(--dk)", padding: "10rem 4rem 5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 85% 50%,rgba(26,74,200,.18) 0%,transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--bl2)", marginBottom: "1.2rem" }}>{breadcrumb}</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 400, color: "var(--cr)", lineHeight: 1, letterSpacing: "-.03em" }}>{title}</h1>
        {desc && <p style={{ fontSize: ".9rem", color: "rgba(238,243,250,.38)", lineHeight: 1.8, maxWidth: "44ch", marginTop: "1.2rem" }}>{desc}</p>}
      </div>
    </div>
  );
}

function CtaBanner({ title, desc, navigate }: { title: string; desc: string; navigate: (p: Page) => void }) {
  return (
    <div style={{
      background: "var(--bl)", padding: "2.5rem 2.5rem",
      display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center"
    }} className="cta-banner">
      <div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem,2.5vw,2rem)", fontWeight: 400, color: "#fff", letterSpacing: "-.02em", marginBottom: ".4rem" }}>{title}</h3>
        <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.65)" }}>{desc}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".8rem", alignItems: "flex-end" }}>
        <a href="tel:947229808" style={{
          background: "#fff", color: "var(--bl)", fontSize: ".82rem", padding: ".65rem 1.4rem",
          borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.28a16 16 0 0 0 6.29 6.29l.89-.89a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" /></svg>
          947 229 808
        </a>
        <a href="#" onClick={e => { e.preventDefault(); navigate("contacto"); }} style={{
          background: "rgba(255,255,255,.15)", color: "#fff", fontSize: ".82rem", padding: ".65rem 1.4rem",
          borderRadius: 100, textDecoration: "none"
        }}>Formulario de contacto →</a>
      </div>
      <style>{`@media(max-width:1024px){.cta-banner{grid-template-columns:1fr!important;text-align:center} .cta-banner>div:last-child{align-items:center!important}}`}</style>
    </div>
  );
}

function Marquee() {
  const items = ["Fontanería", "Calefacción", "Gas", "Reformas", "Calderas", "Saneamiento", "Mantenimiento", "Burgos"];
  const row = (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "0 1.5rem", whiteSpace: "nowrap" as const }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", fontSize: ".65rem", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.75)" }}>
          {item}
          {i < items.length - 1 && <span style={{ width: 3, height: 3, background: "rgba(255,255,255,.35)", borderRadius: "50%", display: "inline-block" }} />}
        </span>
      ))}
      <span style={{ width: 3, height: 3, background: "rgba(255,255,255,.35)", borderRadius: "50%", display: "inline-block" }} />
    </div>
  );
  return (
    <div style={{ background: "var(--bl)", padding: ".7rem 0", overflow: "hidden" }}>
      <div style={{ display: "flex", width: "max-content", animation: "mq 25s linear infinite" }}>
        {[0, 1, 2].map(i => <div key={i}>{row}</div>)}
      </div>
    </div>
  );
}

function HeroIllus() {
  return (
    <svg viewBox="0 0 440 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 360, position: "relative", zIndex: 1 }}>
      <circle cx="220" cy="200" r="180" fill="rgba(26,74,200,.06)" />
      <circle cx="220" cy="200" r="140" fill="rgba(26,74,200,.04)" stroke="rgba(26,74,200,.08)" strokeWidth="1" />
      <rect x="40" y="188" width="360" height="24" rx="12" fill="#1A4AC8" opacity=".15" />
      <rect x="40" y="193" width="360" height="14" rx="7" fill="#1A4AC8" opacity=".25" />
      <rect x="196" y="175" width="48" height="50" rx="6" fill="#1A4AC8" opacity=".3" />
      <rect x="202" y="181" width="36" height="38" rx="4" fill="#2057E0" opacity=".3" />
      <rect x="207" y="60" width="26" height="130" rx="13" fill="#1A4AC8" opacity=".2" />
      <rect x="212" y="60" width="16" height="130" rx="8" fill="#1A4AC8" opacity=".3" />
      <ellipse cx="220" cy="55" rx="8" ry="11" fill="#1A4AC8" opacity=".5" />
      <ellipse cx="220" cy="38" rx="5" ry="7" fill="#1A4AC8" opacity=".3" />
      <ellipse cx="220" cy="25" rx="3" ry="5" fill="#1A4AC8" opacity=".15" />
      <rect x="207" y="210" width="26" height="130" rx="13" fill="#1A4AC8" opacity=".2" />
      <rect x="212" y="210" width="16" height="130" rx="8" fill="#1A4AC8" opacity=".3" />
      <rect x="40" y="188" width="90" height="24" rx="12" fill="#1A4AC8" opacity=".3" />
      <circle cx="115" cy="200" r="18" fill="#1A4AC8" opacity=".25" stroke="#1A4AC8" strokeWidth="2" />
      <circle cx="115" cy="200" r="10" fill="#1A4AC8" opacity=".4" />
      <rect x="310" y="188" width="90" height="24" rx="12" fill="#1A4AC8" opacity=".3" />
      <circle cx="325" cy="200" r="18" fill="#1A4AC8" opacity=".25" stroke="#1A4AC8" strokeWidth="2" />
      <circle cx="325" cy="200" r="10" fill="#1A4AC8" opacity=".4" />
      <rect x="70" y="183" width="40" height="34" rx="8" fill="#1A4AC8" opacity=".2" stroke="#1A4AC8" strokeWidth="1.5" />
      <line x1="90" y1="183" x2="90" y2="217" stroke="#1A4AC8" strokeWidth="2" opacity=".5" />
      <rect x="80" y="176" width="20" height="8" rx="4" fill="#1A4AC8" opacity=".5" />
      <rect x="80" y="216" width="20" height="8" rx="4" fill="#1A4AC8" opacity=".5" />
      <g transform="translate(310, 130) rotate(-30)">
        <rect x="-6" y="-40" width="12" height="80" rx="3" fill="#1A4AC8" opacity=".35" />
        <ellipse cx="0" cy="-38" rx="14" ry="10" fill="none" stroke="#1A4AC8" strokeWidth="2.5" opacity=".5" />
        <ellipse cx="0" cy="38" rx="10" ry="7" fill="#1A4AC8" opacity=".4" />
      </g>
      <g opacity=".4">
        <ellipse cx="140" cy="140" rx="5" ry="7" fill="#1A4AC8" />
        <ellipse cx="300" cy="280" rx="4" ry="6" fill="#1A4AC8" />
        <ellipse cx="330" cy="130" rx="3" ry="5" fill="#1A4AC8" />
        <ellipse cx="110" cy="280" rx="4" ry="6" fill="#1A4AC8" />
      </g>
      <rect x="330" y="240" width="60" height="80" rx="12" fill="#1A4AC8" opacity=".15" stroke="#1A4AC8" strokeWidth="1.5" />
      <rect x="337" y="248" width="46" height="30" rx="6" fill="#1A4AC8" opacity=".2" />
      <circle cx="360" cy="290" r="8" fill="#1A4AC8" opacity=".3" stroke="#1A4AC8" strokeWidth="1.5" />
      <circle cx="360" cy="290" r="4" fill="#1A4AC8" opacity=".5" />
      <rect x="354" y="200" width="12" height="44" rx="6" fill="#1A4AC8" opacity=".3" />
      <circle cx="95" cy="252" r="20" fill="none" stroke="#1A4AC8" strokeWidth="1.5" opacity=".3" />
      <circle cx="95" cy="252" r="14" fill="#1A4AC8" opacity=".08" />
      <line x1="95" y1="252" x2="103" y2="244" stroke="#1A4AC8" strokeWidth="2" strokeLinecap="round" opacity=".5" />
      <circle cx="95" cy="252" r="3" fill="#1A4AC8" opacity=".5" />
      <rect x="89" y="228" width="12" height="28" rx="6" fill="#1A4AC8" opacity=".25" />
    </svg>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const services = [
    { id: "calderas", title: "Calderas y Calefacción", desc: "Instalación y reparación de calderas de condensación, gasóleo, eléctrica y biomasa. Servicio multimarca." },
    { id: "fontaneria", title: "Fontanería", desc: "Instalaciones de saneamiento, baños y cocinas. Detección y reparación de fugas con equipos modernos." },
    { id: "gas", title: "Instalaciones de Gas", desc: "Instaladores autorizados por la Junta de Castilla y León. Alta de gas, boletines y modificaciones." },
    { id: "banos", title: "Reforma de Baños", desc: "Reformas integrales llave en mano. Plato de ducha, mamparas, sanitarios y grifería premium." },
    { id: "cocinas", title: "Reforma de Cocinas", desc: "Renovación completa con instalación de fontanería y gas. Coordinación total de todos los gremios." },
    { id: "radiadores", title: "Radiadores y Suelo Radiante", desc: "Montaje, sustitución y purga de radiadores. Instalación de suelo radiante para máxima eficiencia." },
  ];
  const testimonials = [
    { init: "M", name: "María G.", svc: "Fontanería urgente", text: "Tuve una fuga importante un viernes por la tarde y llamé sin mucha esperanza. Un técnico apareció en menos de una hora. Todo perfecto: amabilidad, rapidez y precio muy razonable." },
    { init: "J", name: "Javier R.", svc: "Calefacción", text: "En otra tienda me pedían 120€ por reparar un radiador. Aquí lo hicieron por 30€, rápido y con muy buen trato. Totalmente recomendado." },
    { init: "E", name: "Elena D.", svc: "Instalación de gas", text: "Detectaron una fuga de gas que yo no había notado. Actuaron con mucha profesionalidad y lo solucionaron en el momento. Son de total confianza." },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 52, background: "var(--bg)" }} className="hero-section">
        <div style={{ padding: "3.5rem 2.5rem 3.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".62rem",
            letterSpacing: ".15em", textTransform: "uppercase" as const, color: "var(--bl)",
            marginBottom: "1.2rem", border: "1px solid rgba(26,74,200,.2)", padding: ".35rem .9rem",
            borderRadius: 100, width: "fit-content"
          }}>
            <div style={{ width: 5, height: 5, background: "var(--bl)", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            Instaladores autorizados · Burgos · Desde 1987
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 400, lineHeight: .95, letterSpacing: "-.03em", color: "var(--dk)", marginBottom: "1.2rem" }}>
            Fontanería<br />con <em style={{ fontStyle: "italic", color: "var(--bl)", display: "block" }}>tradición.</em>
          </h1>
          <p style={{ fontSize: ".83rem", color: "var(--mid)", lineHeight: 1.75, maxWidth: "38ch", marginBottom: "1.8rem", fontWeight: 300 }}>
            Tres generaciones de la familia Valdés cuidando los hogares de Burgos. Fontanería, calefacción e instalaciones de gas.
          </p>
          <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" as const }}>
            <a href="tel:947229808" style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.3rem",
              borderRadius: 100, fontSize: ".75rem", fontWeight: 400, letterSpacing: ".05em",
              textDecoration: "none", background: "var(--bl)", color: "#fff"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.28a16 16 0 0 0 6.29 6.29l.89-.89a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
              </svg>
              Llamar ahora
            </a>
            <a href="#" onClick={e => { e.preventDefault(); navigate("servicios"); }} style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.3rem",
              borderRadius: 100, fontSize: ".75rem", fontWeight: 400, letterSpacing: ".05em",
              textDecoration: "none", background: "transparent", color: "var(--dk)", border: "1.5px solid rgba(9,11,15,.2)"
            }}>Ver servicios →</a>
          </div>
        </div>
        <div style={{
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2.5rem", background: "linear-gradient(135deg,#dce6f5 0%,#cdd9ee 100%)", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 70% 40%,rgba(26,74,200,.1) 0%,transparent 60%)" }} />
          <HeroIllus />
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: "var(--dk)", padding: "1.2rem 2.5rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="stats-bar">
        {[
          { n: "+35", l: "Años de experiencia" }, { n: "3.ª", l: "Generación familiar" },
          { n: "4.1★", l: "Valoración Google" }, { n: "46", l: "Reseñas verificadas" }
        ].map((s, i, arr) => (
          <div key={s.l} style={{ padding: "0 2rem", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "var(--cr)", letterSpacing: "-.03em" }}>{s.n}</div>
            <div style={{ fontSize: ".6rem", color: "rgba(238,243,250,.28)", letterSpacing: ".1em", textTransform: "uppercase" as const, marginTop: ".15rem" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <Marquee />

      {/* SERVICES */}
      <section style={{ padding: "3.5rem 2.5rem", background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.2rem", gap: "2rem", flexWrap: "wrap" as const }}>
          <div>
            <SectionLabel>Nuestros servicios</SectionLabel>
            <SectionTitle>Todo lo que<br />su hogar <Em>necesita</Em></SectionTitle>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); navigate("servicios"); }} style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.3rem",
            borderRadius: 100, fontSize: ".75rem", textDecoration: "none",
            background: "transparent", color: "var(--dk)", border: "1.5px solid rgba(9,11,15,.2)"
          }}>Ver todos →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(9,11,15,.06)", borderRadius: ".8rem", overflow: "hidden" }} className="sv-grid">
          {services.map(sv => (
            <div key={sv.id} style={{ background: "var(--bg)", padding: "1.5rem", transition: "background .25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 400, color: "var(--dk)", marginBottom: ".3rem" }}>{sv.title}</h3>
              <p style={{ fontSize: ".75rem", color: "var(--mid)", lineHeight: 1.65 }}>{sv.desc}</p>
              <a href="#" onClick={e => { e.preventDefault(); navigate("servicios"); }}
                style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".72rem", color: "var(--bl)", textDecoration: "none", marginTop: "1rem" }}>
                Saber más →
              </a>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.sv-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* WHY US */}
      <section style={{ background: "var(--dk)", padding: "3.5rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="why-grid">
          <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 380 }}>
            <circle cx="190" cy="190" r="170" fill="rgba(26,74,200,.05)" stroke="rgba(26,74,200,.08)" strokeWidth="1" />
            <circle cx="190" cy="190" r="120" fill="rgba(26,74,200,.04)" stroke="rgba(26,74,200,.06)" strokeWidth="1" />
            <circle cx="190" cy="110" r="28" fill="#1A4AC8" opacity=".2" stroke="#1A4AC8" strokeWidth="1.5" />
            <circle cx="190" cy="110" r="18" fill="#1A4AC8" opacity=".3" />
            <path d="M155 195 Q155 170 190 165 Q225 170 225 195 L225 260 Q225 268 217 268 L163 268 Q155 268 155 260 Z" fill="#1A4AC8" opacity=".15" stroke="#1A4AC8" strokeWidth="1.5" />
            <g transform="translate(270, 100)">
              <circle cx="0" cy="0" r="28" fill="#1A4AC8" opacity=".2" stroke="#1A4AC8" strokeWidth="1.5" />
              <path d="M-10 0 L-4 8 L12 -8" stroke="#1A4AC8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".7" />
            </g>
            <text x="190" y="360" textAnchor="middle" fontFamily="var(--serif)" fontSize="14" fill="#1A4AC8" opacity=".35">Desde 1987</text>
          </svg>
          <div>
            <SectionLabel>Por qué elegirnos</SectionLabel>
            <SectionTitle dark>Experiencia que<br /><Em>se nota</Em></SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1.8rem" }}>
              {[
                { n: "01", t: "Instaladores autorizados de gas", d: "Certificados por el Ministerio de Industria. Total seguridad en cada instalación." },
                { n: "02", t: "Precios transparentes", d: "Presupuesto sin compromiso. Sin sorpresas ni cargos ocultos." },
                { n: "03", t: "Respuesta rápida", d: "Técnicos disponibles para urgencias. Vehículos taller equipados." },
                { n: "04", t: "Garantía en todo", d: "Garantía sobre mano de obra y materiales en todas las intervenciones." },
              ].map(item => (
                <div key={item.n} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: ".85rem", color: "var(--bl2)", opacity: .6, minWidth: "1.5rem", paddingTop: ".1rem" }}>{item.n}</span>
                  <div>
                    <h4 style={{ fontSize: ".83rem", fontWeight: 500, color: "var(--cr)", marginBottom: ".2rem" }}>{item.t}</h4>
                    <p style={{ fontSize: ".75rem", color: "rgba(238,243,250,.35)", lineHeight: 1.65 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" onClick={e => { e.preventDefault(); navigate("empresa"); }} style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.3rem",
              borderRadius: 100, fontSize: ".75rem", textDecoration: "none",
              marginTop: "2rem", color: "rgba(238,243,250,.5)", border: "1.5px solid rgba(238,243,250,.15)",
              background: "transparent"
            }}>Conocer la empresa →</a>
          </div>
        </div>
        <style>{`@media(max-width:1024px){.why-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* PROCESO */}
      <section style={{ background: "var(--bg2)", padding: "3rem 2.5rem" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>Cómo trabajamos</SectionLabel>
          <SectionTitle>Simple, rápido,<br /><Em>sin sorpresas</Em></SectionTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: "2rem", borderTop: "1px solid rgba(9,11,15,.08)" }} className="proceso-grid">
          {[
            { n: "01", t: "Contacto", d: "Llame, escriba por WhatsApp o rellene el formulario. Respondemos en menos de 2 horas." },
            { n: "02", t: "Presupuesto", d: "Visita gratuita para evaluar el trabajo. Si no acepta el presupuesto, no hay ningún coste." },
            { n: "03", t: "Ejecución", d: "Nuestros técnicos trabajan con precisión y limpieza, respetando los plazos acordados." },
            { n: "04", t: "Garantía", d: "Certificados y garantía sobre mano de obra y materiales. Siempre a su disposición." },
          ].map((p, i, arr) => (
            <div key={p.n} style={{ padding: "1.5rem 1.2rem 1.5rem 0", borderRight: i < arr.length - 1 ? "1px solid rgba(9,11,15,.07)" : "none" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 400, color: "rgba(26,74,200,.12)", lineHeight: 1, marginBottom: "1rem" }}>{p.n}</div>
              <h4 style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--dk)", marginBottom: ".25rem" }}>{p.t}</h4>
              <p style={{ fontSize: ".73rem", color: "var(--mid)", lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.proceso-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:640px){.proceso-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "var(--bg)", padding: "3rem 2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.2rem", gap: "2rem", flexWrap: "wrap" as const }}>
          <div>
            <SectionLabel>Opiniones de clientes</SectionLabel>
            <SectionTitle>Lo que dicen<br /><Em>nuestros clientes</Em></SectionTitle>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", fontWeight: 400, color: "var(--dk)", letterSpacing: "-.04em", lineHeight: 1 }}>4.1</div>
            <div style={{ color: "#1A4AC8", fontSize: ".8rem", margin: ".2rem 0" }}>★★★★☆</div>
            <div style={{ fontSize: ".65rem", color: "var(--pale)", letterSpacing: ".06em", textTransform: "uppercase" as const }}>46 reseñas · Google</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="test-prev-grid">
          {testimonials.map(t => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid rgba(9,11,15,.07)", borderRadius: ".8rem", padding: "1.3rem", transition: "transform .25s,box-shadow .25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(9,11,15,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: ".75rem", color: "#1A4AC8", marginBottom: ".8rem" }}>★★★★★</div>
              <p style={{ fontSize: ".77rem", color: "var(--mid)", lineHeight: 1.7, marginBottom: ".9rem" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem", borderTop: "1px solid rgba(9,11,15,.06)", paddingTop: "1rem" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,var(--bl),#0d2e8a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: ".85rem", color: "#fff", flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontSize: ".78rem", fontWeight: 500, color: "var(--dk)" }}>{t.name}</div>
                  <div style={{ fontSize: ".65rem", color: "var(--pale)" }}>{t.svc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate("testimonios"); }} style={{
            display: "inline-flex", alignItems: "center", padding: ".6rem 1.3rem",
            borderRadius: 100, fontSize: ".75rem", textDecoration: "none",
            background: "transparent", color: "var(--dk)", border: "1.5px solid rgba(9,11,15,.2)"
          }}>Ver todas las opiniones →</a>
        </div>
        <style>{`@media(max-width:1024px){.test-prev-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      <CtaBanner title="¿Tiene una urgencia ahora mismo?" desc="Llame directamente. Atendemos emergencias en horario ampliado." navigate={navigate} />
      <style>{`@media(max-width:1024px){.hero-section{grid-template-columns:1fr!important} .stats-bar{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </>
  );
}

/* ─── SERVICIOS PAGE ─── */
function ServiciosPage({ navigate }: { navigate: (p: Page) => void }) {
  const services = [
    { id: "calderas", title: "Calderas y Calefacción", desc: "Instalación, sustitución y reparación de todo tipo de calderas: condensación, gasóleo, eléctrica y biomasa. Servicio técnico multimarca con piezas originales. Realizamos revisiones anuales oficiales y emitimos el certificado de mantenimiento obligatorio.", tags: ["Instalación", "Reparación", "Mantenimiento", "Certificado"] },
    { id: "fontaneria", title: "Fontanería General", desc: "Instalaciones completas de saneamiento, fontanería en baños y cocinas. Detección de fugas con cámara termográfica y equipos de escucha. Cambio de tuberías, reparación de averías y conexión de electrodomésticos.", tags: ["Fugas", "Saneamiento", "Tuberías", "Urgencias"] },
    { id: "gas", title: "Instalaciones de Gas", desc: "Empresa instaladora autorizada por la Junta de Castilla y León. Realizamos altas de gas (natural y GLP), modificaciones de instalación, boletines oficiales, revisiones periódicas y conexión de aparatos.", tags: ["Gas natural", "GLP / Butano", "Alta de gas", "Boletines"] },
    { id: "banos", title: "Reforma de Baños", desc: "Reformas integrales llave en mano. Cambiamos el plato de ducha, instalamos mamparas, sustituimos sanitarios y grifería. Coordinamos los gremios necesarios para que no tenga que preocuparse de nada.", tags: ["Diseño", "Instalación", "Grifería", "Llave en mano"] },
    { id: "cocinas", title: "Reforma de Cocinas", desc: "Renovación completa de la instalación de fontanería y gas en cocinas. Coordinamos fontaneros, electricistas y albañiles para ofrecerle un servicio integral sin complicaciones.", tags: ["Fontanería", "Gas", "Coordinación", "Presupuesto"] },
    { id: "radiadores", title: "Radiadores y Suelo Radiante", desc: "Montaje de nuevos radiadores, sustitución y purga de los existentes. Instalación de suelo radiante de agua para proyectos de obra nueva o rehabilitación.", tags: ["Radiadores", "Suelo radiante", "Purga", "Obra nueva"] },
  ];

  return (
    <>
      <PageHeader breadcrumb="Inicio › Servicios" title={<>Todos nuestros<br /><Em>servicios</Em></>} desc="Fontanería, calefacción, gas y reformas en Burgos. Instaladores autorizados con más de 35 años de experiencia." />
      <section style={{ padding: "3.5rem 2.5rem", background: "var(--bg)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }} className="sv-full-grid">
          {services.map(sv => (
            <div key={sv.id} style={{ background: "#fff", border: "1px solid rgba(9,11,15,.07)", borderRadius: "1rem", padding: "2rem", transition: "transform .25s,box-shadow .25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(9,11,15,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--dk)", marginBottom: ".6rem" }}>{sv.title}</h3>
              <p style={{ fontSize: ".85rem", color: "var(--mid)", lineHeight: 1.75, marginBottom: "1.2rem" }}>{sv.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: ".4rem" }}>
                {sv.tags.map(tag => (
                  <span key={tag} style={{ fontSize: ".62rem", letterSpacing: ".05em", padding: ".2rem .7rem", borderRadius: 100, background: "rgba(26,74,200,.06)", color: "rgba(26,74,200,.8)", border: "1px solid rgba(26,74,200,.14)" }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.sv-full-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
      <CtaBanner title="¿Necesita presupuesto?" desc="Visita gratuita sin compromiso. Le respondemos en menos de 2 horas." navigate={navigate} />
    </>
  );
}

/* ─── EMPRESA PAGE ─── */
function EmpresaPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHeader breadcrumb="Inicio › Empresa" title={<>Tres generaciones,<br />un solo <Em>compromiso</Em></>} desc="Desde 1987 la familia Valdés ha servido a los hogares de Burgos con honestidad, profesionalidad y cercanía." />
      <section style={{ padding: "3.5rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }} className="historia-grid">
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: "7rem", fontWeight: 400, color: "rgba(26,74,200,.07)", lineHeight: 1, letterSpacing: "-.05em", marginBottom: "-3rem", userSelect: "none" as const }}>1987</div>
          <svg viewBox="0 0 380 320" fill="none" style={{ width: "100%", maxWidth: 380 }}>
            <circle cx="190" cy="160" r="150" fill="rgba(26,74,200,.05)" stroke="rgba(26,74,200,.06)" strokeWidth="1" />
            <path d="M110 220 L110 140 L190 80 L270 140 L270 220 Z" fill="rgba(26,74,200,.08)" stroke="#1A4AC8" strokeWidth="2" strokeLinejoin="round" opacity=".6" />
            <path d="M90 150 L190 80 L290 150" stroke="#1A4AC8" strokeWidth="2.5" fill="none" opacity=".5" />
            <rect x="168" y="175" width="44" height="45" rx="4" fill="#1A4AC8" opacity=".2" stroke="#1A4AC8" strokeWidth="1.5" />
            <circle cx="208" cy="198" r="3" fill="#1A4AC8" opacity=".5" />
          </svg>
        </div>
        <div>
          <SectionLabel>Nuestra historia</SectionLabel>
          <SectionTitle>Raíces en<br /><Em>Burgos</Em></SectionTitle>
          <p style={{ fontSize: ".88rem", color: "var(--mid)", lineHeight: 1.85, marginBottom: "1.2rem" }}>T. Valdés S.L. nació en 1987 cuando Tomás Valdés decidió montar su propio taller de fontanería en el barrio del Gamonal, en Burgos. Con esfuerzo y honestidad ganó la confianza de sus vecinos.</p>
          <p style={{ fontSize: ".88rem", color: "var(--mid)", lineHeight: 1.85, marginBottom: "1.2rem" }}>Hoy, más de 35 años después, la empresa sigue en manos de la familia, con la segunda y tercera generación al frente de un negocio que ha crecido manteniendo los mismos valores que lo fundaron.</p>
          <a href="#" onClick={e => { e.preventDefault(); navigate("contacto"); }} style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.3rem",
            borderRadius: 100, fontSize: ".75rem", textDecoration: "none", marginTop: "1.5rem",
            background: "var(--bl)", color: "#fff"
          }}>Contactar con nosotros →</a>
        </div>
        <style>{`@media(max-width:1024px){.historia-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      <section style={{ background: "var(--dk)", padding: "3rem 2.5rem" }}>
        <SectionLabel>Tres generaciones</SectionLabel>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, color: "var(--cr)", letterSpacing: "-.03em", marginBottom: "3rem" }}>
          Una familia, un <em style={{ fontStyle: "italic", color: "var(--bl2)" }}>oficio</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }} className="tl-grid">
          {[
            { yr: "1987", name: "Tomás Valdés", text: "Fundador y primera generación. Abrió el taller con una furgoneta y el compromiso de dar el mejor servicio en Burgos." },
            { yr: "2005", name: "Carlos Valdés", text: "Segunda generación. Modernizó los equipos, abrió la tienda de repuestos y amplió el equipo de técnicos certificados." },
            { yr: "2018", name: "Adrián Valdés", text: "Tercera generación. Implantó sistemas de gestión modernos y amplió los servicios de reforma integral de baños y cocinas." },
          ].map((tl, i, arr) => (
            <div key={tl.yr} style={{ padding: "0 2.5rem 0 0", borderRight: i < arr.length - 1 ? "1px solid rgba(238,243,250,.06)" : "none" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 400, color: "var(--bl2)", letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".5rem", opacity: .7 }}>{tl.yr}</div>
              <div style={{ fontSize: ".95rem", fontWeight: 500, color: "var(--cr)", marginBottom: ".4rem" }}>{tl.name}</div>
              <p style={{ fontSize: ".8rem", color: "rgba(238,243,250,.35)", lineHeight: 1.7 }}>{tl.text}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.tl-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
      </section>

      <section style={{ padding: "3rem 2.5rem", background: "var(--bg2)" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, letterSpacing: "-.03em", marginBottom: "3rem", textAlign: "center" }}>
          Nuestros <em style={{ fontStyle: "italic", color: "var(--bl)" }}>valores</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }} className="values-grid">
          {[
            { t: "Honestidad", d: "Presupuesto transparente. Lo que se acuerda es lo que se cobra, sin sorpresas." },
            { t: "Puntualidad", d: "Respetamos los plazos acordados. Su tiempo es tan valioso como el nuestro." },
            { t: "Calidad", d: "Solo materiales de primera. Instalaciones que duran décadas, no años." },
            { t: "Cercanía", d: "Familia burgalesa al servicio de Burgos. Le tratamos como a un vecino." },
          ].map(v => (
            <div key={v.t} style={{ background: "#fff", borderRadius: ".8rem", padding: "2rem 1.8rem", border: "1px solid rgba(9,11,15,.06)", textAlign: "center", transition: "transform .25s,box-shadow .25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(9,11,15,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(26,74,200,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bl)", margin: "0 auto 1.2rem", fontFamily: "var(--serif)", fontSize: "1.1rem" }}>✦</div>
              <h4 style={{ fontSize: ".92rem", fontWeight: 500, color: "var(--dk)", marginBottom: ".5rem" }}>{v.t}</h4>
              <p style={{ fontSize: ".78rem", color: "var(--mid)", lineHeight: 1.65 }}>{v.d}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.values-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      <div style={{ padding: "4rem", background: "var(--bg)", borderTop: "1px solid rgba(9,11,15,.07)" }}>
        <div style={{ fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase" as const, color: "var(--pale)", textAlign: "center", marginBottom: "2rem" }}>Certificaciones y autorizaciones</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" as const, gap: "1rem", maxWidth: 800, margin: "0 auto" }}>
          {["Instalador de Gas Autorizado · GLP y Gas Natural", "Certificado por la Junta de Castilla y León", "Servicio técnico oficial multimarca", "Empresa registrada en el REBT", "Seguro de responsabilidad civil", "Homologado Nedgia / Naturgy"].map(cert => (
            <div key={cert} style={{ background: "#fff", border: "1px solid rgba(9,11,15,.08)", borderRadius: ".6rem", padding: ".9rem 1.6rem", fontSize: ".78rem", color: "var(--mid)", display: "flex", alignItems: "center", gap: ".5rem" }}>
              <span style={{ color: "var(--bl)", fontWeight: 500 }}>✓</span> {cert}
            </div>
          ))}
        </div>
      </div>

      <CtaBanner title="¿Quiere conocernos mejor?" desc="Visítenos en nuestra tienda o contáctenos. Sin compromiso." navigate={navigate} />
    </>
  );
}

/* ─── TESTIMONIOS PAGE ─── */
function TestimoniosPage({ navigate }: { navigate: (p: Page) => void }) {
  const reviews = [
    { init: "M", name: "María García", svc: "Fontanería urgente", tag: "Fontanería", stars: 5, big: true, text: "Tuve una fuga importante en el tubo de la lavadora un viernes por la tarde y llamé sin mucha esperanza de que vinieran pronto. Para mi sorpresa, un técnico apareció en menos de una hora. Todo fue perfecto: amabilidad, rapidez y un precio muy razonable. Sin duda contaremos con sus servicios en el futuro. Muy recomendable para cualquier tipo de urgencia." },
    { init: "J", name: "Javier Ruiz", svc: "Calefacción", tag: "Calefacción", stars: 5, text: "En otra tienda me pedían 120€ por reparar un radiador. Aquí lo hicieron por 30€, rápido y con muy buen trato. Totalmente recomendado." },
    { init: "A", name: "Ana Pérez", svc: "Reforma de baño", tag: "Reformas", stars: 5, text: "Amabilidad, rapidez y buenos profesionales. Trabajo bien realizado y precios muy ajustados. Dan explicaciones claras." },
    { init: "C", name: "Carlos Martínez", svc: "Instalación de gas", tag: "Gas", stars: 5, text: "Necesitaba el alta de gas en mi nuevo piso y lo gestionaron todo en tiempo récord. Sin complicaciones y con todos los trámites perfectamente en orden." },
    { init: "E", name: "Elena Díaz", svc: "Fuga de gas", tag: "Gas", stars: 5, text: "Detectaron una fuga de gas que yo no había notado. Actuaron con mucha profesionalidad y lo solucionaron en el momento. Son de total confianza." },
    { init: "L", name: "Luis Fernández", svc: "Plan Mantenimiento", tag: "Plan", stars: 5, text: "Llevamos años con su plan de mantenimiento y siempre están cuando los necesitamos. El técnico es un profesional excelente y muy puntual." },
    { init: "P", name: "Patricia Álvarez", svc: "Reforma integral", tag: "Reformas", stars: 4, text: "Hicimos reforma completa del baño con ellos. El resultado es exactamente lo que queríamos. Bien coordinados y sin imprevistos de precio." },
    { init: "R", name: "Roberto Sanz", svc: "Reparación caldera", tag: "Caldera", stars: 5, text: "La caldera llevaba años dando problemas y nadie encontraba la avería. Ellos la diagnosticaron en diez minutos. Precio justo y trabajo impecable." },
    { init: "I", name: "Isabel Torres", svc: "Suelo radiante", tag: "Calefacción", stars: 5, text: "Muy buenos profesionales. Vinieron a instalar el suelo radiante en nuestra obra nueva y todo fue perfecto. Puntuales, limpios y muy bien de precio." },
  ];

  return (
    <>
      <div style={{ background: "var(--dk)", padding: "10rem 4rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 85% 50%,rgba(26,74,200,.18) 0%,transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "flex-end" }} className="test-header-grid">
          <div>
            <div style={{ fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--bl2)", marginBottom: "1.2rem" }}>Inicio › Opiniones</div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 400, color: "var(--cr)", lineHeight: 1, letterSpacing: "-.03em" }}>
              Lo que dicen<br /><em style={{ fontStyle: "italic", color: "var(--bl2)" }}>nuestros clientes</em>
            </h1>
          </div>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "5rem", fontWeight: 400, color: "var(--cr)", letterSpacing: "-.05em", lineHeight: 1, textAlign: "right" }}>4.1</div>
            <div style={{ color: "var(--bl2)", fontSize: ".9rem", textAlign: "right", margin: ".2rem 0" }}>★★★★☆</div>
            <div style={{ fontSize: ".65rem", color: "rgba(238,243,250,.25)", letterSpacing: ".08em", textTransform: "uppercase" as const, textAlign: "right" }}>46 reseñas verificadas · Google</div>
          </div>
        </div>
        <style>{`@media(max-width:1024px){.test-header-grid{grid-template-columns:1fr!important}}`}</style>
      </div>

      <section style={{ padding: "3rem 2.5rem", background: "var(--bg)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }} className="reviews-grid">
          {reviews.map(r => (
            <div key={r.name} style={{
              background: "#fff", border: "1px solid rgba(9,11,15,.07)", borderRadius: ".8rem", padding: "2rem",
              transition: "transform .25s,box-shadow .25s", gridColumn: r.big ? "span 2" : "span 1"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(9,11,15,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: ".75rem", color: "#1A4AC8", marginBottom: ".8rem" }}>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
              <p style={{ fontSize: ".84rem", color: "var(--mid)", lineHeight: 1.78, marginBottom: "1.2rem" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem", borderTop: "1px solid rgba(9,11,15,.06)", paddingTop: "1rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--bl),#0d2e8a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: ".9rem", color: "#fff", flexShrink: 0 }}>{r.init}</div>
                <div>
                  <div style={{ fontSize: ".8rem", fontWeight: 500, color: "var(--dk)" }}>{r.name}</div>
                  <div style={{ fontSize: ".65rem", color: "var(--pale)" }}>{r.svc}</div>
                </div>
                <span style={{ marginLeft: "auto", fontSize: ".62rem", padding: ".18rem .6rem", borderRadius: 100, background: "rgba(26,74,200,.06)", color: "rgba(26,74,200,.7)", border: "1px solid rgba(26,74,200,.14)" }}>{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.reviews-grid{grid-template-columns:1fr!important} .reviews-grid>div{grid-column:span 1!important}}`}</style>
      </section>

      <div style={{ background: "var(--bg2)", padding: "2.5rem 2.5rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(9,11,15,.07)" }} className="test-stats-grid">
        {[{ n: "4.1", l: "Puntuación media" }, { n: "46", l: "Reseñas Google" }, { n: "96%", l: "Recomiendan" }, { n: "+35", l: "Años de confianza" }].map((s, i, arr) => (
          <div key={s.l} style={{ padding: "0 2rem", borderRight: i < arr.length - 1 ? "1px solid rgba(9,11,15,.07)" : "none", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "2.4rem", fontWeight: 400, color: "var(--bl)", letterSpacing: "-.04em" }}>{s.n}</div>
            <div style={{ fontSize: ".65rem", color: "var(--pale)", letterSpacing: ".08em", textTransform: "uppercase" as const, marginTop: ".2rem" }}>{s.l}</div>
          </div>
        ))}
        <style>{`@media(max-width:1024px){.test-stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </div>

      <div style={{ background: "var(--bl)", padding: "4rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" as const }}>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 400, color: "#fff", marginBottom: ".4rem", letterSpacing: "-.02em" }}>¿Es usted cliente nuestro?</h3>
          <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.65)" }}>Nos encantaría conocer su opinión. Deje su reseña en Google.</p>
        </div>
        <a href="#" onClick={e => { e.preventDefault(); navigate("contacto"); }} style={{ background: "#fff", color: "var(--bl)", fontSize: ".82rem", padding: ".8rem 1.8rem", borderRadius: 100, textDecoration: "none" }}>Contactar →</a>
      </div>
    </>
  );
}

/* ─── CONTACTO PAGE ─── */
function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const contactItems = [
    { title: "Teléfono", content: "947 229 808", sub: "Lunes a viernes 8:00–20:00", href: "tel:947229808" },
    { title: "WhatsApp", content: "653 868 490", sub: "Respuesta rápida · También fines de semana", href: "https://wa.me/34653868490" },
    { title: "Tienda", content: "C. Diego Laínez, 4 Bajo", sub: "09005 Burgos, España", href: "https://maps.google.com/?q=Calle+Diego+Lainez+4+Burgos" },
    { title: "Horario", content: "L–V 8:00–20:00 · S 9:00–14:00", sub: "Urgencias en horario ampliado", href: undefined },
  ];

  return (
    <>
      <PageHeader breadcrumb="Inicio › Contacto" title={<>Hablemos<br /><Em>sin compromiso</Em></>} desc="Rellene el formulario o llámenos directamente. Le respondemos en menos de 2 horas en horario laboral." />
      <section style={{ padding: "3.5rem 2.5rem", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem" }} className="contact-grid">
        <div>
          <SectionLabel>Formulario de contacto</SectionLabel>
          <SectionTitle>Cuéntenos<br /><Em>su caso</Em></SectionTitle>
          {sent ? (
            <div style={{ background: "rgba(26,74,200,.06)", border: "1px solid rgba(26,74,200,.2)", borderRadius: "1rem", padding: "2.5rem 2rem", marginTop: "2rem", textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--bl)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--bl)", marginBottom: ".5rem" }}>¡Mensaje enviado!</h3>
              <p style={{ fontSize: ".85rem", color: "var(--mid)" }}>Le contactaremos en menos de 2 horas en horario laboral.</p>
            </div>
          ) : (
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { key: "nombre", label: "Nombre completo", type: "text", placeholder: "María García" },
                { key: "telefono", label: "Teléfono", type: "tel", placeholder: "947 000 000" },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: ".72rem", letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--mid)", display: "block", marginBottom: ".4rem" }}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={(form as any)[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ width: "100%", padding: ".8rem 1rem", borderRadius: ".6rem", border: "1.5px solid rgba(9,11,15,.12)", background: "#fff", fontSize: ".85rem", color: "var(--dk)", fontFamily: "var(--sans)", outline: "none" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: ".72rem", letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--mid)", display: "block", marginBottom: ".4rem" }}>Servicio</label>
                <select value={form.servicio} onChange={e => setForm({ ...form, servicio: e.target.value })}
                  style={{ width: "100%", padding: ".8rem 1rem", borderRadius: ".6rem", border: "1.5px solid rgba(9,11,15,.12)", background: "#fff", fontSize: ".85rem", color: "var(--dk)", fontFamily: "var(--sans)", outline: "none" }}>
                  <option value="">Seleccionar servicio</option>
                  {["Calderas y calefacción", "Fontanería", "Gas", "Reforma de baño", "Reforma de cocina", "Radiadores", "Otro"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: ".72rem", letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--mid)", display: "block", marginBottom: ".4rem" }}>Mensaje</label>
                <textarea placeholder="Describa brevemente su consulta o avería..." value={form.mensaje}
                  onChange={e => setForm({ ...form, mensaje: e.target.value })} rows={5}
                  style={{ width: "100%", padding: ".8rem 1rem", borderRadius: ".6rem", border: "1.5px solid rgba(9,11,15,.12)", background: "#fff", fontSize: ".85rem", color: "var(--dk)", fontFamily: "var(--sans)", resize: "vertical" as const, outline: "none" }} />
              </div>
              <button onClick={() => { if (form.nombre && form.telefono && form.mensaje) setSent(true); }}
                style={{ background: "var(--bl)", color: "#fff", border: "none", padding: ".8rem 1.8rem", borderRadius: 100, fontSize: ".82rem", fontFamily: "var(--sans)", cursor: "pointer", alignSelf: "flex-start" }}>
                Enviar mensaje →
              </button>
            </div>
          )}
        </div>
        <div>
          <SectionLabel>Información de contacto</SectionLabel>
          <SectionTitle>Estamos<br /><Em>aquí</Em></SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
            {contactItems.map(item => (
              <a key={item.title} href={item.href} target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1.1rem 1.3rem", background: "#fff", borderRadius: ".8rem", border: "1px solid rgba(9,11,15,.07)", textDecoration: "none", transition: "box-shadow .2s, transform .2s" }}
                onMouseEnter={e => { if (item.href) { e.currentTarget.style.boxShadow = "0 8px 24px rgba(9,11,15,.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(26,74,200,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bl)", flexShrink: 0, fontSize: "1rem" }}>
                  {item.title === "Teléfono" ? "☎" : item.title === "WhatsApp" ? "💬" : item.title === "Tienda" ? "📍" : "🕐"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--pale)", marginBottom: ".15rem" }}>{item.title}</div>
                  <div style={{ fontSize: ".9rem", fontWeight: 500, color: "var(--dk)" }}>{item.content}</div>
                  <div style={{ fontSize: ".73rem", color: "var(--mid)", marginTop: ".1rem" }}>{item.sub}</div>
                </div>
                {item.href && <span style={{ color: "var(--bl)", fontSize: ".8rem", flexShrink: 0 }}>→</span>}
              </a>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", borderRadius: "1rem", height: 200, background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(9,11,15,.07)", flexDirection: "column", gap: ".6rem" }}>
            <span style={{ fontSize: "1.5rem" }}>📍</span>
            <span style={{ fontSize: ".85rem", color: "var(--mid)", fontWeight: 500 }}>C. Diego Laínez, 4 Bajo · Burgos</span>
            <a href="https://maps.google.com/?q=Calle+Diego+Lainez+4+Burgos" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: ".73rem", color: "var(--bl)", textDecoration: "none", borderBottom: "1px solid rgba(26,74,200,.3)" }}>
              Ver en Google Maps →
            </a>
          </div>
        </div>
        <style>{`@media(max-width:1024px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  );
}

/* ─── MAIN APP ─── */
export default function Page() {
  const [page, setPage] = useState<Page>("home");

  function navigate(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <style>{globalStyle}</style>
      <Nav current={page} navigate={navigate} />
      <main>
        {page === "home"        && <HomePage navigate={navigate} />}
        {page === "servicios"   && <ServiciosPage navigate={navigate} />}
        {page === "empresa"     && <EmpresaPage navigate={navigate} />}
        {page === "testimonios" && <TestimoniosPage navigate={navigate} />}
        {page === "contacto"    && <ContactoPage />}
      </main>
      <Footer navigate={navigate} />
      <Fab />
    </>
  );
}