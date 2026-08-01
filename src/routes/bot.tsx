import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BotMessageSquare, Download, FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { botChecks } from "@/data/mock";

export const Route = createFileRoute("/bot")({
  head: () => ({
    meta: [
      { title: "Bot Validador de Pré-Protocolo | LicenseAI" },
      {
        name: "description",
        content:
          "Auditoria automática de documentos técnicos minerários com checklist de conformidade e relatório executivo.",
      },
      { property: "og:title", content: "Bot Validador de Pré-Protocolo | LicenseAI" },
      {
        property: "og:description",
        content: "Simule a checagem de Plano de Pesquisa, RFP e Licença Prévia antes do protocolo.",
      },
    ],
  }),
  component: BotPage,
});

function BotPage() {
  const [file, setFile] = useState("Plano_de_Pesquisa_Litio_Aracuai_v4.pdf");
  const [state, setState] = useState<"idle" | "running" | "done">("idle");

  const run = () => {
    setState("running");
    setTimeout(() => {
      setState("done");
      toast.success("Auditoria concluída", { description: "4 conformes · 2 pendências · 1 bloqueio" });
    }, 1800);
  };

  const score = 68;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Bot Validador & Pré-Protocolo</h1>
        <p className="text-sm text-muted-foreground">
          Envie o documento técnico e o Bot audita padrão, campos obrigatórios e certidões vinculadas.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card className="surface-panel">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileUp className="size-4 text-primary" /> Documento para auditoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed p-6 text-center transition-colors hover:bg-accent/40">
              <FileUp className="size-5 text-primary" />
              <span className="text-xs font-medium">Arraste o arquivo ou clique para selecionar</span>
              <span className="text-[11px] text-muted-foreground">PDF, DOCX ou ZIP até 40 MB</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? file)}
              />
            </label>
            <Input value={file} onChange={(e) => setFile(e.target.value)} className="text-xs" />
            <Textarea
              className="text-xs"
              rows={4}
              defaultValue={"Processo ANM 831.402/2023 — Lítio / Araçuaí-MG\nFase: Licenciamento Ambiental (LP)\nResponsável técnico: geólogo, ART 2826/2026"}
            />
            <Button className="w-full" onClick={run} disabled={state === "running"}>
              {state === "running" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Bot auditando documento...
                </>
              ) : (
                <>
                  <BotMessageSquare className="size-4" /> Executar auditoria
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">Checklist de conformidade</CardTitle>
            {state === "done" && <StatusBadge status="pendente" label={`Score ${score}%`} />}
          </CardHeader>
          <CardContent className="space-y-3">
            {state === "idle" && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Execute a auditoria para gerar o checklist de pré-protocolo.
              </p>
            )}
            {state === "running" && (
              <div className="space-y-3 py-8">
                <p className="text-center text-sm text-muted-foreground">
                  Bot cruzando o documento com a matriz normativa ANM / SEMAD / Prefeitura...
                </p>
                <Progress value={62} className="h-2 animate-pulse" />
              </div>
            )}
            {state === "done" && (
              <>
                {botChecks.map((c) => (
                  <div key={c.label} className="flex items-start gap-3 rounded-lg border p-3">
                    <StatusBadge status={c.status} label="" className="mt-0.5 px-2" />
                    <div>
                      <p className="text-xs font-medium">{c.label}</p>
                      <p className="text-[11px] text-muted-foreground">{c.detail}</p>
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button
                    onClick={() => toast.success("Relatório Executivo de Auditoria Regulatória gerado")}
                  >
                    <Download className="size-4" /> Baixar relatório executivo
                  </Button>
                  <Button variant="outline" onClick={run}>
                    Reprocessar documento
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
