export type Sphere = "Federal" | "Estadual" | "Municipal";
export type Status = "conforme" | "pendente" | "bloqueado";

export const projects = [
  {
    id: "lit-mg",
    name: "Projeto Lítio — Vale do Jequitinhonha",
    uf: "MG",
    city: "Araçuaí",
    mineral: "Lítio",
    phase: "Licenciamento Ambiental",
    anmProcess: "ANM 831.402/2023",
    readiness: 78,
    risk: "Médio" as const,
    holder: "Serra Verde Mineração S.A.",
  },
  {
    id: "bau-pa",
    name: "Pesquisa de Bauxita — Paragominas",
    uf: "PA",
    city: "Paragominas",
    mineral: "Bauxita",
    phase: "Relatório Final de Pesquisa",
    anmProcess: "ANM 850.117/2022",
    readiness: 54,
    risk: "Crítico" as const,
    holder: "Norte Bauxita Ltda.",
  },
  {
    id: "fer-mg",
    name: "Expansão Ferro — Quadrilátero Ferrífero",
    uf: "MG",
    city: "Itabirito",
    mineral: "Ferro",
    phase: "Licenciamento Ambiental",
    anmProcess: "ANM 830.998/2019",
    readiness: 91,
    risk: "Baixo" as const,
    holder: "Ferrous Itabirito S.A.",
  },
  {
    id: "our-pa",
    name: "Requerimento Ouro — Itaituba",
    uf: "PA",
    city: "Itaituba",
    mineral: "Ouro",
    phase: "Requerimento de Pesquisa",
    anmProcess: "ANM 852.740/2025",
    readiness: 36,
    risk: "Crítico" as const,
    holder: "Tapajós Recursos Minerais",
  },
];

export const spheres: {
  sphere: Sphere;
  agency: string;
  pending: number;
  done: number;
  blocked: number;
}[] = [
  { sphere: "Federal", agency: "ANM / IBAMA", pending: 7, done: 23, blocked: 1 },
  { sphere: "Estadual", agency: "SEMAD-MG / SEMAS-PA", pending: 11, done: 19, blocked: 2 },
  { sphere: "Municipal", agency: "Uso e Ocupação do Solo", pending: 4, done: 9, blocked: 1 },
];

export const licenses = [
  { code: "LP", name: "Licença Prévia — Lítio Araçuaí", agency: "SEMAD-MG", days: 42, status: "pendente" as Status },
  { code: "LI", name: "Licença de Instalação — Itabirito", agency: "SEMAD-MG", days: 118, status: "conforme" as Status },
  { code: "LO", name: "Licença de Operação — Paragominas", agency: "SEMAS-PA", days: 17, status: "bloqueado" as Status },
  { code: "EX", name: "Exigência ANM — Plano de Pesquisa", agency: "ANM 6ª Reg.", days: 9, status: "bloqueado" as Status },
  { code: "FM", name: "Formulário FCE — Caracterização", agency: "SEMAS-PA", days: 61, status: "pendente" as Status },
];

export const conditionals = [
  { sphere: "Federal" as Sphere, done: 23, total: 31 },
  { sphere: "Estadual" as Sphere, done: 19, total: 32 },
  { sphere: "Municipal" as Sphere, done: 9, total: 14 },
];

export const riskMatrix = [
  { label: "Multa administrativa (ANM)", level: "Médio" },
  { label: "Paralisação de lavra", level: "Baixo" },
  { label: "Embargo municipal (uso do solo)", level: "Crítico" },
  { label: "Exposição reputacional / ESG", level: "Médio" },
];

export const readinessTrend = [
  { mes: "Mar", indice: 51 },
  { mes: "Abr", indice: 58 },
  { mes: "Mai", indice: 62 },
  { mes: "Jun", indice: 60 },
  { mes: "Jul", indice: 71 },
  { mes: "Ago", indice: 78 },
];

export const minerals = ["Lítio", "Ouro", "Ferro", "Bauxita", "Agregados"];
export const states = [
  { uf: "MG", cities: ["Araçuaí", "Itabirito", "Conselheiro Lafaiete"] },
  { uf: "BA", cities: ["Jacobina", "Caetité"] },
  { uf: "PA", cities: ["Paragominas", "Itaituba"] },
  { uf: "SP", cities: ["Ribeirão Preto", "Sorocaba"] },
];
export const phases = [
  "Requerimento de Pesquisa",
  "Relatório Final de Pesquisa",
  "Licenciamento Ambiental",
];

export type Requirement = {
  agency: string;
  sphere: Sphere;
  item: string;
  type: "Documento" | "Taxa" | "Certidão" | "Formulário";
  deadline: string;
  status: Status;
};

export function buildMatrix(mineral: string, uf: string, city: string, phase: string): Requirement[] {
  const base: Requirement[] = [
    { agency: "ANM", sphere: "Federal", item: `Requerimento eletrônico via SIGMINE — ${mineral}`, type: "Documento", deadline: "Protocolo imediato", status: "conforme" },
    { agency: "ANM", sphere: "Federal", item: "TAH — Taxa Anual por Hectare", type: "Taxa", deadline: "Anual (jan/jul)", status: "pendente" },
    { agency: "ANM", sphere: "Federal", item: "Anotação de Responsabilidade Técnica (ART/CREA)", type: "Documento", deadline: "Com o protocolo", status: "conforme" },
    { agency: `Secretaria Estadual (${uf})`, sphere: "Estadual", item: "Formulário de Caracterização do Empreendimento (FCE)", type: "Formulário", deadline: "30 dias", status: "pendente" },
    { agency: `Secretaria Estadual (${uf})`, sphere: "Estadual", item: "Outorga / anuência de recursos hídricos", type: "Certidão", deadline: "60 dias", status: "pendente" },
    { agency: `Prefeitura de ${city}`, sphere: "Municipal", item: "Certidão de Uso e Ocupação do Solo", type: "Certidão", deadline: "45 dias", status: "bloqueado" },
    { agency: `Prefeitura de ${city}`, sphere: "Municipal", item: "Alvará de localização e funcionamento", type: "Documento", deadline: "Pré-instalação", status: "pendente" },
  ];

  const byPhase: Record<string, Requirement[]> = {
    "Requerimento de Pesquisa": [
      { agency: "ANM", sphere: "Federal", item: "Plano de Pesquisa + memorial descritivo da poligonal", type: "Documento", deadline: "Com o protocolo", status: "pendente" },
      { agency: "ANM", sphere: "Federal", item: "Emolumento de requerimento de pesquisa", type: "Taxa", deadline: "Protocolo", status: "conforme" },
    ],
    "Relatório Final de Pesquisa": [
      { agency: "ANM", sphere: "Federal", item: "Relatório Final de Pesquisa (RFP) conforme IN ANM", type: "Documento", deadline: "Prazo do alvará", status: "bloqueado" },
      { agency: "ANM", sphere: "Federal", item: "Avaliação econômica da reserva medida/indicada", type: "Documento", deadline: "Com o RFP", status: "pendente" },
    ],
    "Licenciamento Ambiental": [
      { agency: `Secretaria Estadual (${uf})`, sphere: "Estadual", item: "EIA/RIMA ou RCA/PCA conforme porte", type: "Documento", deadline: "90 dias", status: "pendente" },
      { agency: `Secretaria Estadual (${uf})`, sphere: "Estadual", item: "PRAD — Plano de Recuperação de Áreas Degradadas", type: "Documento", deadline: "Com a LP", status: "conforme" },
      { agency: "IBAMA", sphere: "Federal", item: "Autorização de supressão vegetal (se bioma protegido)", type: "Documento", deadline: "Pré-instalação", status: "pendente" },
    ],
  };

  return [...base, ...(byPhase[phase] ?? [])];
}

export type BotCheck = { status: Status; label: string; detail: string };

export const botChecks: BotCheck[] = [
  { status: "conforme", label: "Formato e campos obrigatórios preenchidos", detail: "PDF/A válido, 34 campos obrigatórios identificados." },
  { status: "conforme", label: "ART/CREA do responsável técnico válida", detail: "ART 2826/2026 ativa — geólogo registrado." },
  { status: "conforme", label: "Poligonal compatível com SIGMINE", detail: "Vértices conferem com o processo ANM 831.402/2023." },
  { status: "pendente", label: "Ausência de Certidão de Uso do Solo Municipal", detail: "Prefeitura de Araçuaí — exigível antes da LP." },
  { status: "pendente", label: "Cronograma físico-financeiro sem assinatura digital", detail: "Assinar com certificado ICP-Brasil (e-CNPJ)." },
  { status: "bloqueado", label: "Documento fora do padrão exigido pela ANM regional", detail: "Anexo III sem tabela de sondagens no layout da 6ª Região." },
];
