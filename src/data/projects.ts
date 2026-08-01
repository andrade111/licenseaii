import type { Sphere, Status } from "./mock";

export type ColumnId = "andamento" | "recorrecao" | "concluidos";

export type Task = {
  id: string;
  title: string;
  agency: string;
  column: ColumnId;
  reason?: string | undefined;
};

export type ProjectContextData = {
  id: string;
  name: string;
  short: string;
  uf: string;
  city: string;
  mineral: string;
  phase: string;
  anmProcess: string;
  holder: string;
  readiness: number;
  risk: "Baixo" | "Médio" | "Crítico";
  verdict: string;
  bottleneck: string;
  trend: { mes: string; indice: number }[];
  licenses: { code: string; name: string; agency: string; days: number; status: Status }[];
  conditionals: { sphere: Sphere; done: number; total: number }[];
  spheres: { sphere: Sphere; agency: string; pending: number; done: number; blocked: number }[];
  riskMatrix: { label: string; level: string }[];
  tasks: Task[];
};

export const PROJECTS: ProjectContextData[] = [
  {
    id: "lit-mg",
    name: "Lítio — Vale do Jequitinhonha",
    short: "Lítio / Araçuaí-MG",
    uf: "MG",
    city: "Araçuaí",
    mineral: "Lítio",
    phase: "Licenciamento Ambiental",
    anmProcess: "ANM 831.402/2023",
    holder: "Serra Verde Mineração S.A.",
    readiness: 82,
    risk: "Médio",
    verdict: "Apto com pendências",
    bottleneck: "Certidão de Uso e Ocupação do Solo pendente na Prefeitura de Araçuaí.",
    trend: [
      { mes: "Mar", indice: 58 },
      { mes: "Abr", indice: 63 },
      { mes: "Mai", indice: 69 },
      { mes: "Jun", indice: 74 },
      { mes: "Jul", indice: 79 },
      { mes: "Ago", indice: 82 },
    ],
    licenses: [
      { code: "LP", name: "Licença Prévia — Araçuaí", agency: "SEMAD-MG", days: 42, status: "pendente" },
      { code: "CS", name: "Certidão de Uso do Solo", agency: "Prefeitura de Araçuaí", days: 12, status: "bloqueado" },
      { code: "TAH", name: "Taxa Anual por Hectare", agency: "ANM 6ª Reg.", days: 88, status: "conforme" },
      { code: "PR", name: "PRAD aprovado", agency: "SEMAD-MG", days: 120, status: "conforme" },
    ],
    conditionals: [
      { sphere: "Federal", done: 27, total: 30 },
      { sphere: "Estadual", done: 24, total: 29 },
      { sphere: "Municipal", done: 8, total: 12 },
    ],
    spheres: [
      { sphere: "Federal", agency: "ANM 6ª Região / IBAMA", pending: 3, done: 27, blocked: 0 },
      { sphere: "Estadual", agency: "SEMAD-MG / FEAM", pending: 5, done: 24, blocked: 0 },
      { sphere: "Municipal", agency: "Prefeitura de Araçuaí", pending: 3, done: 8, blocked: 1 },
    ],
    riskMatrix: [
      { label: "Embargo municipal (uso do solo)", level: "Crítico" },
      { label: "Multa administrativa (ANM)", level: "Baixo" },
      { label: "Atraso na emissão da LP", level: "Médio" },
      { label: "Exposição reputacional / ESG", level: "Médio" },
    ],
    tasks: [
      { id: "l1", title: "EIA/RIMA — capítulo de fauna", agency: "SEMAD-MG", column: "andamento" },
      { id: "l2", title: "Plano de Pesquisa — poligonal Araçuaí", agency: "ANM 6ª Região", column: "andamento" },
      { id: "l3", title: "Certidão de Uso e Ocupação do Solo", agency: "Prefeitura de Araçuaí", column: "recorrecao", reason: "Certidão municipal ausente no dossiê da LP." },
      { id: "l4", title: "Cronograma físico-financeiro", agency: "ANM", column: "recorrecao", reason: "Sem assinatura digital ICP-Brasil (e-CNPJ)." },
      { id: "l5", title: "PRAD — Recuperação de áreas degradadas", agency: "SEMAD-MG", column: "concluidos" },
      { id: "l6", title: "ART/CREA do responsável técnico", agency: "CREA-MG", column: "concluidos" },
      { id: "l7", title: "Outorga hídrica — captação superficial", agency: "IGAM-MG", column: "concluidos" },
    ],
  },
  {
    id: "bau-pa",
    name: "Bauxita — Paragominas",
    short: "Bauxita / Paragominas-PA",
    uf: "PA",
    city: "Paragominas",
    mineral: "Bauxita",
    phase: "Relatório Final de Pesquisa",
    anmProcess: "ANM 850.117/2022",
    holder: "Norte Bauxita Ltda.",
    readiness: 58,
    risk: "Médio",
    verdict: "Risco médio de licenciamento",
    bottleneck: "Outorga de água pendente na SEMAS-PA e Licença Prévia com vencimento próximo.",
    trend: [
      { mes: "Mar", indice: 41 },
      { mes: "Abr", indice: 44 },
      { mes: "Mai", indice: 48 },
      { mes: "Jun", indice: 52 },
      { mes: "Jul", indice: 55 },
      { mes: "Ago", indice: 58 },
    ],
    licenses: [
      { code: "LP", name: "Licença Prévia — Paragominas", agency: "SEMAS-PA", days: 17, status: "bloqueado" },
      { code: "OU", name: "Outorga de recursos hídricos", agency: "SEMAS-PA", days: 24, status: "bloqueado" },
      { code: "RFP", name: "Relatório Final de Pesquisa", agency: "ANM", days: 35, status: "pendente" },
      { code: "FM", name: "Formulário FCE — Caracterização", agency: "SEMAS-PA", days: 61, status: "pendente" },
    ],
    conditionals: [
      { sphere: "Federal", done: 14, total: 26 },
      { sphere: "Estadual", done: 11, total: 28 },
      { sphere: "Municipal", done: 6, total: 11 },
    ],
    spheres: [
      { sphere: "Federal", agency: "ANM 4ª Região / IBAMA", pending: 9, done: 14, blocked: 1 },
      { sphere: "Estadual", agency: "SEMAS-PA", pending: 14, done: 11, blocked: 2 },
      { sphere: "Municipal", agency: "Prefeitura de Paragominas", pending: 4, done: 6, blocked: 1 },
    ],
    riskMatrix: [
      { label: "Vencimento da Licença Prévia", level: "Crítico" },
      { label: "Paralisação de lavra", level: "Crítico" },
      { label: "Multa administrativa (ANM)", level: "Médio" },
      { label: "Exposição reputacional / ESG", level: "Médio" },
    ],
    tasks: [
      { id: "b1", title: "Avaliação econômica da reserva medida", agency: "ANM", column: "andamento" },
      { id: "b2", title: "Requerimento de outorga hídrica", agency: "SEMAS-PA", column: "recorrecao", reason: "Vazão declarada divergente do PCA protocolado." },
      { id: "b3", title: "Relatório Final de Pesquisa (RFP)", agency: "ANM", column: "recorrecao", reason: "Anexo III fora do layout exigido pela regional." },
      { id: "b4", title: "Renovação da Licença Prévia", agency: "SEMAS-PA", column: "recorrecao", reason: "Protocolo de renovação fora do prazo de 120 dias." },
      { id: "b5", title: "Formulário FCE — caracterização", agency: "SEMAS-PA", column: "recorrecao", reason: "Campos de supressão vegetal em branco." },
      { id: "b6", title: "Anuência municipal de tráfego pesado", agency: "Prefeitura de Paragominas", column: "recorrecao", reason: "Falta memorial de rotas e horários." },
      { id: "b7", title: "ART/CREA do responsável técnico", agency: "CREA-PA", column: "concluidos" },
    ],
  },
  {
    id: "cal-ba",
    name: "Agregados / Calcário — Simões Filho",
    short: "Calcário / Simões Filho-BA",
    uf: "BA",
    city: "Simões Filho",
    mineral: "Agregados",
    phase: "Licenciamento Ambiental",
    anmProcess: "ANM 871.245/2024",
    holder: "Bahia Agregados S.A.",
    readiness: 95,
    risk: "Baixo",
    verdict: "Pronto para submissão",
    bottleneck: "Apenas o recolhimento da taxa ANM permanece pendente.",
    trend: [
      { mes: "Mar", indice: 72 },
      { mes: "Abr", indice: 79 },
      { mes: "Mai", indice: 84 },
      { mes: "Jun", indice: 88 },
      { mes: "Jul", indice: 92 },
      { mes: "Ago", indice: 95 },
    ],
    licenses: [
      { code: "TAH", name: "Taxa Anual por Hectare", agency: "ANM 3ª Reg.", days: 8, status: "pendente" },
      { code: "LU", name: "Licença Unificada — Simões Filho", agency: "INEMA-BA", days: 210, status: "conforme" },
      { code: "CS", name: "Certidão de Uso do Solo", agency: "Prefeitura de Simões Filho", days: 175, status: "conforme" },
      { code: "PR", name: "PRAD aprovado", agency: "INEMA-BA", days: 190, status: "conforme" },
    ],
    conditionals: [
      { sphere: "Federal", done: 21, total: 22 },
      { sphere: "Estadual", done: 25, total: 26 },
      { sphere: "Municipal", done: 10, total: 11 },
    ],
    spheres: [
      { sphere: "Federal", agency: "ANM 3ª Região", pending: 1, done: 21, blocked: 0 },
      { sphere: "Estadual", agency: "INEMA-BA", pending: 1, done: 25, blocked: 0 },
      { sphere: "Municipal", agency: "Prefeitura de Simões Filho", pending: 1, done: 10, blocked: 0 },
    ],
    riskMatrix: [
      { label: "Multa administrativa (ANM)", level: "Médio" },
      { label: "Paralisação de lavra", level: "Baixo" },
      { label: "Embargo municipal (uso do solo)", level: "Baixo" },
      { label: "Exposição reputacional / ESG", level: "Baixo" },
    ],
    tasks: [
      { id: "c1", title: "Recolhimento da taxa ANM (TAH)", agency: "ANM 3ª Reg.", column: "recorrecao", reason: "Guia emitida sem código de receita correto." },
      { id: "c2", title: "Relatório de monitoramento trimestral", agency: "INEMA-BA", column: "andamento" },
      { id: "c3", title: "Plano de lavra aprovado", agency: "ANM", column: "concluidos" },
      { id: "c4", title: "Licença Unificada emitida", agency: "INEMA-BA", column: "concluidos" },
      { id: "c5", title: "Certidão de Uso do Solo", agency: "Prefeitura de Simões Filho", column: "concluidos" },
      { id: "c6", title: "PRAD — Recuperação de áreas degradadas", agency: "INEMA-BA", column: "concluidos" },
      { id: "c7", title: "ART/CREA do responsável técnico", agency: "CREA-BA", column: "concluidos" },
      { id: "c8", title: "Outorga hídrica", agency: "INEMA-BA", column: "concluidos" },
    ],
  },
];
