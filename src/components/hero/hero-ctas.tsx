type HeroCtasProps = {
  primaryHref?: string;
  secondaryHref?: string;
};

export default function HeroCtas({
  primaryHref = "#como-funciona",
  secondaryHref = "#organizacion",
}: HeroCtasProps) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={primaryHref}
        className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-semibold text-white transition-[filter] hover:brightness-95"
        style={{ background: "linear-gradient(180deg,#f2a23a 0%,#d9731e 100%)", border: "1px solid rgba(0,0,0,.15)" }}
      >
        Empezar Ahora
      </a>
      <a
        href={secondaryHref}
        className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-semibold text-white transition-[filter] hover:brightness-95"
        style={{ background: "linear-gradient(180deg,#2e7fc3 0%,#1f67a3 100%)", border: "1px solid rgba(255,255,255,.35)" }}
      >
        Más Información
      </a>
    </div>
  );
}
