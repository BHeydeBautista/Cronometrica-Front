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
        className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5"
      >
        Ver el flujo
      </a>
      <a
        href={secondaryHref}
        className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
      >
        Ver organización
      </a>
    </div>
  );
}
