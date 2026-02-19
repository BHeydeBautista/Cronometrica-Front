import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "brand";
};

export default function Button({ variant = "solid", className, ...props }: ButtonProps) {
  const base =
    "inline-flex min-h-9 max-w-full items-center justify-center rounded-full px-4 py-2 text-center text-sm font-medium leading-5 whitespace-normal disabled:opacity-50";
  const styles =
    variant === "brand"
      ? "bg-brand text-brand-foreground"
      : variant === "solid"
        ? "bg-foreground text-background"
        : "border border-foreground/15 text-foreground hover:border-foreground/25 hover:bg-foreground/5";

  return <button className={`${base} ${styles} ${className ?? ""}`} {...props} />;
}
