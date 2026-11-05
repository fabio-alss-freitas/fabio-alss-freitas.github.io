export type StoreLink = { kind: "appstore" | "play" | "web"; href: string; label?: string };

export type App = {
  id: string;
  name: string;
  kicker: string;
  title: string;
  lead: string;
  icon: string;
  shots: string[];
  // Gravação da versão web, mostrada numa janela de navegador no lugar dos celulares.
  video?: { src: string; poster: string; url: string };
  accent: string;
  platforms: string;
  links: StoreLink[];
  note?: string;
  extra?: { label: string; href: string }[];
};

export const apps: App[] = [
  {
    id: "aeromet",
    name: "AeroMet",
    kicker: "Aviação · Meteorologia",
    title: "O briefing meteorológico que cabe no bolso.",
    lead:
      "Feito para a rotina de quem voa por profissão. O AeroMet monta o briefing do seu voo com dados oficiais: METAR e TAF de origem, destino e alternados com teto e visibilidade em destaque, NOTAM e SIGMET filtrados pela rota e pelo horário, e radar e satélite sobre o trajeto.",
    icon: "/img/aeromet-icon.png",
    shots: ["/img/shots/aeromet-04-map.jpg", "/img/shots/aeromet-07-metar.jpg"],
    accent: "#1d9bf0",
    platforms: "iOS · Android · Widget",
    links: [
      { kind: "appstore", href: "https://apps.apple.com/br/app/aeromet-metar-taf-e-notam/id1549597697" },
      { kind: "play", href: "https://play.google.com/store/apps/details?id=com.fresan.aeromet" },
    ],
    note: "4,9 ★ na App Store · mais de 700 avaliações",
    extra: [
      { label: "Política de privacidade", href: "/aeromet/policy/" },
      { label: "Termos de uso", href: "/aeromet/terms/" },
    ],
  },
  {
    id: "aerohelper",
    name: "AeroHelper",
    kicker: "Educação · Aviação",
    title: "Treino de órbitas e radiais, com a correção no instrumento.",
    lead:
      "Entradas em órbita pelo RMI, pelo HSI ou pela carta. Cada questão mostra o instrumento na situação e, depois da resposta, a resolução passo a passo e uma animação do voo.",
    icon: "/img/aerohelper-icon.png",
    shots: ["/img/shots/aerohelper-1.jpg", "/img/shots/aerohelper-2.jpg"],
    accent: "#12c77a",
    platforms: "iOS · Android · iPad",
    links: [
      { kind: "appstore", href: "https://apps.apple.com/br/app/aerohelper/id6827271511" },
      { kind: "play", href: "https://play.google.com/store/apps/details?id=com.fresan.aerohelper" },
    ],
    note: "Gratuito, sem anúncios e sem cadastro",
  },
  {
    id: "orbify",
    name: "Orbify",
    kicker: "Viagens · Mídia",
    title: "Suas memórias ao redor do mundo.",
    lead:
      "Suas fotos e vídeos aparecem num globo, cada um no lugar onde foi feito, com trilha sonora e a paisagem sonora do lugar. Dá para girar o planeta e reviver cada viagem.",
    icon: "/img/orbify-icon.png",
    shots: [],
    video: { src: "/img/shots/orbify.mp4", poster: "/img/shots/orbify-poster.jpg", url: "orbify.fresan.digital" },
    accent: "#22a8d6",
    platforms: "Web · Android e iOS em breve",
    links: [{ kind: "web", href: "https://orbify.fresan.digital", label: "Abrir o Orbify" }],
  },
];
