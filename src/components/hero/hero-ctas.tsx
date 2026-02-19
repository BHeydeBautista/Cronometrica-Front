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
        className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
      >
        Ver el flujo
      </a>
      <a
        href={secondaryHref}
        className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-5 text-sm font-medium"
      >
        Ver organización
      </a>
    </div>
  );
}
