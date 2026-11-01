export type HomeFeature = {
  id: "GAMEPAD" | "FREE" | "TROPHY" | "ROCKET";
  title: string;
  desc: string;
  color: "cyan" | "magenta" | "yellow" | "green";
};

export type HomeStat = {
  number: string;
  unit: string;
  sub: string;
};

export type HomeActivityRow = {
  player: string;
  game: string;
  score: number;
  time: string;
  color: "cyan" | "magenta" | "yellow" | "green";
};

export type HomeTopPlayer = {
  rank: number;
  player: string;
  score: number;
};

export type PricingFaq = {
  q: string;
  a: string;
};

export type HomeFeaturedGame = {
  id: string;
  title: string;
  cat: string;
  cover: string;
};

export const HOME_FEATURES: HomeFeature[] = [
  {
    id: "GAMEPAD",
    title: "JUEGOS CLÁSICOS",
    desc: "Arkanoid, Tetris, Snake y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    color: "cyan",
  },
  {
    id: "FREE",
    title: "100% GRATIS",
    desc: "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    color: "yellow",
  },
  {
    id: "TROPHY",
    title: "LADDER BOARDS",
    desc: "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    color: "magenta",
  },
  {
    id: "ROCKET",
    title: "SIEMPRE CRECIENDO",
    desc: "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    color: "green",
  },
];

export const HOME_STATS: HomeStat[] = [
  {
    number: "12+",
    unit: "JUEGOS",
    sub: "Y CONTANDO",
  },
  {
    number: "MILES",
    unit: "DE PARTIDAS",
    sub: "JUGADAS CADA DÍA",
  },
  {
    number: "GLOBAL",
    unit: "RANKING",
    sub: "COMPITE CON EL MUNDO",
  },
];

export const HOME_ACTIVITY: HomeActivityRow[] = [
  {
    player: "NEONFOX",
    game: "Caída",
    score: 184220,
    time: "hace 2 min",
    color: "magenta",
  },
  {
    player: "PX_KAI",
    game: "Glotón",
    score: 96400,
    time: "hace 5 min",
    color: "yellow",
  },
  {
    player: "Z3R0COOL",
    game: "Invasores",
    score: 54190,
    time: "hace 8 min",
    color: "green",
  },
  {
    player: "VAULT_07",
    game: "Rocas",
    score: 41200,
    time: "hace 12 min",
    color: "cyan",
  },
  {
    player: "GLITCHA",
    game: "Bloque Buster",
    score: 28450,
    time: "hace 18 min",
    color: "cyan",
  },
  {
    player: "ARKADYA",
    game: "Serpentina",
    score: 7820,
    time: "hace 24 min",
    color: "green",
  },
  {
    player: "CYBER_LU",
    game: "Ranaria",
    score: 18900,
    time: "hace 31 min",
    color: "yellow",
  },
];

export const HOME_TOP_PLAYERS: HomeTopPlayer[] = [
  { rank: 1, player: "NEONFOX", score: 312840 },
  { rank: 2, player: "PX_KAI", score: 248110 },
  { rank: 3, player: "M00NRYU", score: 196720 },
  { rank: 4, player: "VAULT_07", score: 154300 },
  { rank: 5, player: "GLITCHA", score: 138900 },
];

export const PRICING_FAQ: PricingFaq[] = [
  {
    q: "¿REALMENTE ES GRATIS?",
    a: "Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión 'premium' escondida.",
  },
  {
    q: "¿NECESITO CREAR CUENTA?",
    a: "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
  },
  {
    q: "¿CÓMO SOBREVIVEN SIN COBRAR?",
    a: "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
  },
];

export const HOME_FEATURED_GAMES: HomeFeaturedGame[] = [
  {
    id: "bloque-buster",
    title: "BLOQUE BUSTER",
    cat: "ARCADE",
    cover: "cover-bricks",
  },
  {
    id: "caida",
    title: "CAÍDA",
    cat: "PUZZLE",
    cover: "cover-tetro",
  },
  {
    id: "serpentina",
    title: "SERPENTINA",
    cat: "ARCADE",
    cover: "cover-snake",
  },
  {
    id: "gloton",
    title: "GLOTÓN",
    cat: "ARCADE",
    cover: "cover-glot",
  },
  {
    id: "invasores",
    title: "INVASORES",
    cat: "SHOOTER",
    cover: "cover-invaders",
  },
  {
    id: "rocas",
    title: "ROCAS",
    cat: "SHOOTER",
    cover: "cover-rocas",
  },
];