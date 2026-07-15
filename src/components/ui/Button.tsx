import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:opacity-80",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
};

const baseClass =
  "group/btn relative inline-flex items-center justify-center rounded-full font-body font-semibold transition-colors";

const sizeClass: Record<Size, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

const CORNER_BASE =
  "absolute h-2.5 w-2.5 border-accent opacity-0 transition-all duration-300 ease-out group-hover/btn:opacity-100";

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      {/* corner brackets — sit outside the pill's bounding box */}
      <span aria-hidden className="pointer-events-none absolute -inset-2">
        <span
          className={cn(
            CORNER_BASE,
            "left-0 top-0 -translate-x-1 -translate-y-1 border-l-2 border-t-2 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          )}
        />
        <span
          className={cn(
            CORNER_BASE,
            "right-0 top-0 translate-x-1 -translate-y-1 border-r-2 border-t-2 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          )}
        />
        <span
          className={cn(
            CORNER_BASE,
            "bottom-0 left-0 -translate-x-1 translate-y-1 border-b-2 border-l-2 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          )}
        />
        <span
          className={cn(
            CORNER_BASE,
            "bottom-0 right-0 translate-x-1 translate-y-1 border-b-2 border-r-2 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          )}
        />
      </span> {/* <-- MISSING CLOSING TAG ADDED HERE */}

      {/* text layer-swap */}
      <span className="relative inline-block overflow-hidden">
        <span aria-hidden className="invisible">
          {children}
        </span>
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
    </>
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className } = props;
  const classes = cn(baseClass, sizeClass[size], variantClass[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, children: _c, className: _cl, variant: _v, size: _s, ...rest } =
      props as ButtonAsLink;
    const isProtocolLink = href.startsWith("mailto:") || href.startsWith("tel:");

    if (external || isProtocolLink) {
      const targetProps = isProtocolLink
        ? {}
        : { target: "_blank" as const, rel: "noopener noreferrer" };
      return (
        <a href={href} className={classes} {...targetProps} {...rest}>
          <ButtonContent>{children}</ButtonContent>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <ButtonContent>{children}</ButtonContent>
      </Link>
    );
  }

  const { children: _c, className: _cl, variant: _v, size: _s, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}