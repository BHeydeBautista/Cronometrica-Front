type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-colors duration-200 hover:bg-foreground/10">
      <p className="text-xs font-medium text-foreground/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-brand">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-sm leading-6 text-foreground/70">{hint}</p>
      ) : null}
    </div>
  );
}
