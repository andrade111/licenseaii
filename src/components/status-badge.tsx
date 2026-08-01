import { cn } from "@/lib/utils";
import type { Status } from "@/data/mock";

const map: Record<Status, { label: string; cls: string }> = {
  conforme: { label: "Conforme", cls: "bg-success/12 text-success border-success/30" },
  pendente: { label: "Pendente", cls: "bg-warning/18 text-warning-foreground border-warning/40" },
  bloqueado: { label: "Bloqueado", cls: "bg-danger/12 text-danger border-danger/30" },
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.cls,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? s.label}
    </span>
  );
}

export function RiskBadge({ level }: { level: string }) {
  const status: Status = level === "Baixo" ? "conforme" : level === "Médio" ? "pendente" : "bloqueado";
  return <StatusBadge status={status} label={`Risco ${level}`} />;
}
