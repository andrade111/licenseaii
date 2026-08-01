import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarClock,
  Gauge,
  Landmark,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusBadge, RiskBadge } from "@/components/status-badge";
import { useProject } from "@/context/project-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Regulatório | LicenseAI" },
      {
        name: "description",
        content:
          "Índice de Prontidão Regulatória, prazos de LP/LI/LO, condicionantes e risco fiscal dos projetos minerários.",
      },
      { property: "og:title", content: "Dashboard Regulatório | LicenseAI" },
      {
        property: "og:description",
        content: "Controle de conformidade minerária nas esferas federal, estadual e municipal.",
      },
    ],
  }),
  component: Dashboard,
});

function Ring({ value }: { value: number }) {
  const size = 176;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  return (
    <div className="relative grid size-44 place-items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90">
        <circle cx={cx} cy={cx} r={r} className="fill-none stroke-muted" strokeWidth={stroke} />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          className="fill-none stroke-primary transition-all duration-700"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-3xl font-semibold leading-none">{value}%</p>
          <p className="mt-1 text-[11px] text-muted-foreground">prontidão</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { project } = useProject();
  const totals = project.conditionals.reduce(
    (a, c) => ({ done: a.done + c.done, total: a.total + c.total }),
    { done: 0, total: 0 },
  );
  const global = Math.round((totals.done / totals.total) * 100);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard Regulatório</h1>
          <p className="text-sm text-muted-foreground">
            {project.name} · {project.city}/{project.uf} · {project.anmProcess} · {project.phase}
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg shadow-sm">
          Exportar visão executiva
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="surface-panel lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Gauge className="size-4 text-primary" /> Índice de Prontidão Regulatória
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-5">
            <Ring value={project.readiness} />
            <div className="space-y-2 text-xs">
              <StatusBadge
                status={project.readiness >= 90 ? "conforme" : project.readiness >= 70 ? "pendente" : "bloqueado"}
                label={project.verdict}
              />
              <ul className="space-y-1.5">
                {project.conditionals.map((c) => (
                  <li key={c.sphere}>
                    <span className="text-muted-foreground">{c.sphere}</span>
                    <p className="font-medium">
                      {Math.round((c.done / c.total) * 100)}% · {c.done}/{c.total}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-panel lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4 text-primary" /> Evolução do índice (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[190px] pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={project.trend}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={11} width={30} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="indice"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#g)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="surface-panel border-l-4 border-l-warning">
        <CardContent className="flex items-start gap-3 py-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <div>
            <p className="text-xs font-semibold">Gargalo crítico identificado</p>
            <p className="text-xs text-muted-foreground">{project.bottleneck}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CalendarClock className="size-4 text-primary" /> Controle de prazos & vencimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.licenses.map((l) => (
              <div key={l.name} className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-[10px] font-semibold text-secondary-foreground">
                  {l.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{l.name}</p>
                  <p className="text-[11px] text-muted-foreground">{l.agency}</p>
                </div>
                <StatusBadge status={l.status} label={`${l.days} d`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShieldAlert className="size-4 text-primary" /> Cumprimento de condicionantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.conditionals.map((c) => (
              <div key={c.sphere} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{c.sphere}</span>
                  <span className="text-muted-foreground">
                    {c.done} cumpridas · {c.total - c.done} pendentes
                  </span>
                </div>
                <Progress value={Math.round((c.done / c.total) * 100)} className="h-2" />
              </div>
            ))}
            <div className="rounded-lg bg-muted/60 p-3 text-[11px] text-muted-foreground">
              Taxa global de cumprimento: <strong className="text-foreground">{global}%</strong> — meta trimestral 80%.
            </div>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="size-4 text-primary" /> Matriz de risco fiscal & reputacional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {project.riskMatrix.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-2 rounded-lg border p-2.5">
                <span className="text-xs">{r.label}</span>
                <RiskBadge level={r.level} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="surface-panel">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Landmark className="size-4 text-primary" /> Visão tripartida por esfera
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {project.spheres.map((s) => (
            <div key={s.sphere} className="rounded-lg border p-4 shadow-sm">
              <p className="font-display text-sm font-semibold">{s.sphere}</p>
              <p className="text-[11px] text-muted-foreground">{s.agency}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  { v: s.done, l: "Concluídas", c: "text-success" },
                  { v: s.pending, l: "Pendentes", c: "text-warning-foreground" },
                  { v: s.blocked, l: "Bloqueios", c: "text-danger" },
                ].map((x) => (
                  <div key={x.l} className="rounded-lg bg-muted/60 py-2">
                    <p className={`font-display text-lg font-semibold ${x.c}`}>{x.v}</p>
                    <p className="text-[10px] text-muted-foreground">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <ProjectSwitcherCards />
    </div>
  );
}

function ProjectSwitcherCards() {
  const { projects, project, setProjectId } = useProject();
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Projetos ativos</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <Card
            key={p.id}
            onClick={() => setProjectId(p.id)}
            className={`surface-panel cursor-pointer transition-shadow hover:shadow-lg ${
              p.id === project.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm leading-snug">{p.name}</CardTitle>
              <p className="text-[11px] text-muted-foreground">
                {p.city} / {p.uf} · {p.mineral}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{p.anmProcess}</span>
                <RiskBadge level={p.risk} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Prontidão</span>
                  <span className="font-semibold">{p.readiness}%</span>
                </div>
                <Progress value={p.readiness} className="h-2" />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Fase: <span className="text-foreground">{p.phase}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
