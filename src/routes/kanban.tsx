import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, GripVertical, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kanban")({
  head: () => ({
    meta: [
      { title: "Kanban Interorgânico | GeoReg Matrix" },
      {
        name: "description",
        content:
          "Quadro horizontal de acompanhamento: em andamento, recorreção automática pelo Bot e documentos concluídos.",
      },
      { property: "og:title", content: "Kanban Interorgânico | GeoReg Matrix" },
      {
        property: "og:description",
        content: "Acompanhe pendências ANM, estaduais e municipais com recorreção automática via Bot.",
      },
    ],
  }),
  component: Kanban,
});

type ColumnId = "andamento" | "recorrecao" | "concluidos";

type Task = {
  id: string;
  title: string;
  project: string;
  agency: string;
  column: ColumnId;
  reason?: string;
};

const initial: Task[] = [
  { id: "t1", title: "Plano de Pesquisa — poligonal Araçuaí", project: "Lítio / MG", agency: "ANM 6ª Região", column: "andamento" },
  { id: "t2", title: "EIA/RIMA — capítulo de fauna", project: "Ferro / Itabirito-MG", agency: "SEMAD-MG", column: "andamento" },
  { id: "t3", title: "Requerimento de outorga hídrica", project: "Bauxita / PA", agency: "SEMAS-PA", column: "andamento" },
  { id: "t4", title: "Relatório Final de Pesquisa (RFP)", project: "Bauxita / Paragominas-PA", agency: "ANM", column: "recorrecao", reason: "Anexo III fora do layout exigido pela ANM regional." },
  { id: "t5", title: "Certidão de Uso e Ocupação do Solo", project: "Lítio / Araçuaí-MG", agency: "Prefeitura de Araçuaí", column: "recorrecao", reason: "Certidão municipal ausente no dossiê da LP." },
  { id: "t6", title: "Cronograma físico-financeiro", project: "Ouro / Itaituba-PA", agency: "ANM", column: "recorrecao", reason: "Sem assinatura digital ICP-Brasil (e-CNPJ)." },
  { id: "t7", title: "PRAD — Recuperação de áreas degradadas", project: "Ferro / MG", agency: "SEMAD-MG", column: "concluidos" },
  { id: "t8", title: "ART/CREA do responsável técnico", project: "Lítio / MG", agency: "ANM", column: "concluidos" },
];

function Kanban() {
  const [tasks, setTasks] = useState(initial);
  const [fixing, setFixing] = useState<string | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);

  const move = (id: string, column: ColumnId) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, column, reason: column === "concluidos" ? undefined : x.reason } : x)));

  const recorrigir = (task: Task) => {
    setFixing(task.id);
    setTimeout(() => {
      setFixing(null);
      move(task.id, "concluidos");
      toast.success("Recorreção concluída", { description: `${task.title} validado pelo Bot.` });
    }, 1700);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Kanban Interorgânico</h1>
        <p className="text-sm text-muted-foreground">
          Arraste os cards entre as colunas ou acione a recorreção automática do Bot.
        </p>
      </div>

      <div className="flex flex-row items-start gap-4 overflow-x-auto pb-4">
        {(["andamento", "recorrecao", "concluidos"] as ColumnId[]).map((id) => {
          const meta = { andamento: { title: "Em andamento", accent: "bg-info" }, recorrecao: { title: "Recorreção", accent: "bg-warning" }, concluidos: { title: "Concluídos", accent: "bg-success" } }[id];
          const items = tasks.filter((t) => t.column === id);
          return (
            <section
              key={id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragged) move(dragged, id);
                setDragged(null);
              }}
              className="flex w-[320px] min-w-[320px] shrink-0 flex-col rounded-xl border bg-muted/50 p-3"
            >
              <header className="mb-3 flex items-center gap-2">
                <span className={cn("size-2 rounded-full", meta.accent)} />
                <h2 className="text-sm font-semibold">{meta.title}</h2>
                <Badge variant="secondary" className="ml-auto">{items.length}</Badge>
              </header>
              <div className="flex flex-col gap-3">
                {items.map((t) => (
                  <article
                    key={t.id}
                    draggable
                    onDragStart={() => setDragged(t.id)}
                    className="surface-panel cursor-grab space-y-2 p-3 active:cursor-grabbing"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug">{t.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {t.project} · {t.agency}
                        </p>
                      </div>
                    </div>

                    {t.reason && (
                      <p className="rounded-md bg-warning/15 p-2 text-[11px] text-warning-foreground">
                        <strong>Bot:</strong> {t.reason}
                      </p>
                    )}

                    {id === "recorrecao" && (
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={fixing === t.id}
                        onClick={() => recorrigir(t)}
                      >
                        {fixing === t.id ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" /> Bot reanalisando parâmetros...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="size-3.5" /> Recorrigir
                          </>
                        )}
                      </Button>
                    )}

                    {id === "concluidos" && (
                      <p className="flex items-center gap-1.5 text-[11px] font-medium text-success">
                        <CheckCircle2 className="size-3.5" /> Validado — pronto para submissão
                      </p>
                    )}
                  </article>
                ))}
                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed p-6 text-center text-[11px] text-muted-foreground">
                    Solte um card aqui
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
