import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { buildMatrix, minerals, phases, states, type Sphere } from "@/data/mock";
import { useProject } from "@/context/project-context";

export const Route = createFileRoute("/matriz")({
  head: () => ({
    meta: [
      { title: "Matriz Interativa de Requisitos | LicenseAI" },
      {
        name: "description",
        content:
          "Filtre por mineral, estado/município e fase do direito minerário para ver documentos, taxas e certidões exigidos por órgão.",
      },
      { property: "og:title", content: "Matriz Interativa de Requisitos | LicenseAI" },
      {
        property: "og:description",
        content: "Requisitos parametrizados por ANM, Secretaria Estadual e Prefeitura.",
      },
    ],
  }),
  component: Matriz,
});

const order: Sphere[] = ["Federal", "Estadual", "Municipal"];

function Matriz() {
  const { project } = useProject();
  const [mineral, setMineral] = useState(project.mineral);
  const [uf, setUf] = useState(project.uf);
  const [city, setCity] = useState(project.city);
  const [phase, setPhase] = useState(project.phase);

  useEffect(() => {
    setMineral(project.mineral);
    setUf(project.uf);
    setCity(project.city);
    setPhase(project.phase);
  }, [project]);

  const cities = states.find((s) => s.uf === uf)?.cities ?? [];
  const rows = useMemo(() => buildMatrix(mineral, uf, city, phase), [mineral, uf, city, phase]);
  const grouped = order.map((s) => ({ sphere: s, items: rows.filter((r) => r.sphere === s) }));


  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Matriz Interativa de Requisitos</h1>
        <p className="text-sm text-muted-foreground">
          Contexto: {project.name} — três passos para gerar a matriz parametrizada por órgão competente.
        </p>
      </div>


      <Card className="surface-panel">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Filter className="size-4 text-primary" /> Filtro dinâmico
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Step label="1 · Mineral">
            <Select value={mineral} onValueChange={setMineral}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {minerals.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </Step>
          <Step label="2 · Estado">
            <Select
              value={uf}
              onValueChange={(v) => {
                setUf(v);
                setCity(states.find((s) => s.uf === v)?.cities[0] ?? "");
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {states.map((s) => <SelectItem key={s.uf} value={s.uf}>{s.uf}</SelectItem>)}
              </SelectContent>
            </Select>
          </Step>
          <Step label="2 · Município">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Step>
          <Step label="3 · Fase do direito minerário">
            <Select value={phase} onValueChange={setPhase}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {phases.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </Step>
        </CardContent>
      </Card>

      {grouped.map((g) => (
        <Card key={g.sphere} className="surface-panel overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">
              Esfera {g.sphere}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {g.items[0]?.agency}
              </span>
            </CardTitle>
            <Badge variant="secondary">{g.items.length} exigências</Badge>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Órgão competente</TableHead>
                  <TableHead>Exigência</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {g.items.map((r) => (
                  <TableRow key={r.item}>
                    <TableCell className="pl-6 text-xs font-medium">{r.agency}</TableCell>
                    <TableCell className="text-xs">{r.item}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[11px]">{r.type}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.deadline}</TableCell>
                    <TableCell className="pr-6 text-right"><StatusBadge status={r.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
