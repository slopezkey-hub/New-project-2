import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type LinkHref = ComponentProps<typeof Link>["href"];

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: LinkHref;
  type?: "button" | "submit";
  variant?: "gold" | "ghost" | "outline";
  disabled?: boolean;
  onClick?: () => void;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300";

const variants = {
  gold: "bg-gold text-black shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]",
  ghost:
    "border border-white/10 bg-white/5 text-copy hover:border-gold/40 hover:bg-white/10 hover:text-white",
  outline:
    "border border-primary/50 bg-primary/10 text-copy hover:border-gold/50 hover:bg-primary/20"
};

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "gold",
  disabled,
  onClick
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variants[variant],
    disabled && "cursor-not-allowed opacity-50",
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
