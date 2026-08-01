export function ReadinessRing({ value, status }: { value: number; status?: string }) {
  const size = 208;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;

  return (
    <div className="relative grid size-52 place-items-center">
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
      <div className="absolute inset-0 grid place-items-center p-4 text-center">
        <div>
          <p className="font-display text-4xl font-bold leading-none tracking-tight">{value}%</p>
          {status && (
            <p className="mt-1.5 text-[11px] font-medium leading-tight text-muted-foreground line-clamp-2">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
