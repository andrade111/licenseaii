import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, GripVertical, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useProject } from "@/context/project-context";
import type { ColumnId, Task } from "@/data/projects";

export const Route = createFileRoute("/kanban")({
  head: () => ({
    meta: [
      { title: "Kanban Interorgânico | LicenseAI" },
      {
        name: "description",
        content:
          "Quadro horizontal de acompanhamento: em andamento, recorreção automática pelo Bot e documentos concluídos.",
      },
      { property: "og:title", content: "Kanban Interorgânico | LicenseAI" },
      {
        property: "og:description",
        content: "Acompanhe pendências ANM, estaduais e municipais com recorreção automática via Bot.",
      },
    ],
  }),
  component: Kanban,
});

const COLUMNS: { id: ColumnId; title: string; accent: string }[] = [
  { id: "andamento", title: "Em andamento", accent: "bg-info" },
  { id: "recorrecao", title: "Recorreção", accent: "bg-warning" },
  { id: "concluidos", title: "Concluídos", accent: "bg-success" },
];

function Kanban() {
  const { project } = useProject();
  const [overrides, setOverrides] = useState<Record<string, ColumnId>>({});
  const [fixing, setFixing] = useState<string | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);

  const columnOf = (t: Task) => overrides[t.id] ?? t.column;
  const move = (id: string, column: ColumnId) => setOverrides((o) => ({ ...o, [id]: column }));

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
          {project.name} · arraste os cards entre as colunas ou acione a recorreção automática do Bot.
        </p>
      </div>

      <div className="flex flex-row items-start gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const items = project.tasks.filter((t) => columnOf(t) === col.id);
          return (
            <section
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragged) move(dragged, col.id);
                setDragged(null);
              }}
              className="flex w-[320px] min-w-[320px] shrink-0 flex-col rounded-lg border bg-muted/50 p-3 shadow-sm"
            >
              <header className="mb-3 flex items-center gap-2">
                <span className={cn("size-2 rounded-full", col.accent)} />
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <Badge variant="secondary" className="ml-auto">{items.length}</Badge>
              </header>
              <div className="flex flex-col gap-3">
                {items.map((t) => (
                  <article
                    key={t.id}
                    draggable
                    onDragStart={() => setDragged(t.id)}
                    className="surface-panel cursor-grab space-y-2 rounded-lg p-3 active:cursor-grabbing"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug">{t.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {project.short} · {t.agency}
                        </p>
                      </div>
                    </div>

                    {col.id === "recorrecao" && t.reason && (
                      <p className="rounded-md bg-warning/15 p-2 text-[11px] text-warning-foreground">
                        <strong>Bot:</strong> {t.reason}
                      </p>
                    )}

                    {col.id === "recorrecao" && (
                      <Button
                        size="sm"
                        className="w-full rounded-lg"
                        disabled={fixing === t.id}
                        onClick={() => recorrigir(t)}
                      >
                        {fixing === t.id ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" /> Analisando pendências...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="size-3.5" /> Recorrigir
                          </>
                        )}
                      </Button>
                    )}

                    {col.id === "concluidos" && (
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
