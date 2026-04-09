import { Loader2 } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import * as React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#1D68D5] text-white shadow-sm hover:bg-[#1557b8] focus-visible:ring-[#1D68D5]/40",
  secondary:
    "bg-[#16B2C3] text-white shadow-sm hover:bg-[#1299a8] focus-visible:ring-[#16B2C3]/40",
  outline:
    "border-2 border-[#1D68D5] bg-transparent text-[#1D68D5] hover:bg-[#1D68D5]/5 focus-visible:ring-[#1D68D5]/30",
  ghost: "bg-transparent text-[#344054] hover:bg-[#F2F4F7] focus-visible:ring-[#101828]/15",
  destructive:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500/40",
  link: "bg-transparent p-0 h-auto min-h-0 text-[#1D68D5] underline-offset-4 hover:underline focus-visible:ring-[#1D68D5]/30 shadow-none",
};

const sizeStyles: Record<Size, string> = {
  xs: "h-8 gap-1.5 rounded-md px-3 text-xs",
  sm: "h-9 gap-2 rounded-lg px-3.5 text-sm",
  md: "h-11 gap-2 rounded-lg px-5 text-sm",
  lg: "h-12 gap-2.5 rounded-lg px-7 text-base",
  xl: "h-14 gap-3 rounded-xl px-8 text-base font-semibold",
  "icon-sm": "h-9 w-9 shrink-0 gap-0 rounded-lg p-0",
  icon: "h-11 w-11 shrink-0 gap-0 rounded-lg p-0",
  "icon-lg": "h-12 w-12 shrink-0 gap-0 rounded-xl p-0",
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type SharedButtonProps = {
  /** Visual style preset. */
  variant?: Variant;
  /** Height, padding, and typography scale. */
  size?: Size;
  /** Stretch to full width of the container. */
  fullWidth?: boolean;
  /** Show spinner and disable interaction. */
  loading?: boolean;
  /** Shown before the label (hidden for icon-only sizes when loading). */
  leftIcon?: React.ReactNode;
  /** Shown after the label. */
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export type HomepageButtonProps =
  | (SharedButtonProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (SharedButtonProps &
      LinkProps &
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
        href: LinkProps["href"];
      });

function useButtonContent(
  props: Pick<
    HomepageButtonProps,
    "loading" | "leftIcon" | "rightIcon" | "children" | "size"
  >
) {
  const { loading, leftIcon, rightIcon, children, size = "md" } = props;
  const isIconSize = size === "icon" || size === "icon-sm" || size === "icon-lg";

  if (loading) {
    return (
      <>
        <Loader2
          className={cn("animate-spin", isIconSize ? "h-5 w-5" : "h-4 w-4")}
          aria-hidden
        />
        {!isIconSize && <span className="sr-only">Loading</span>}
        {!isIconSize && children}
      </>
    );
  }

  return (
    <>
      {leftIcon && !isIconSize ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
      {children}
      {rightIcon && !isIconSize ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
      {isIconSize && children}
    </>
  );
}

function buildClassName(
  variant: Variant,
  size: Size,
  fullWidth: boolean | undefined,
  className: string | undefined
) {
  const isLinkVariant = variant === "link";
  return cn(
    baseStyles,
    !isLinkVariant && variantStyles[variant],
    isLinkVariant && variantStyles.link,
    !isLinkVariant && sizeStyles[size],
    fullWidth && "w-full",
    className
  );
}

/**
 * Polymorphic button: native `<button>` by default, or Next.js `<Link>` when `href` is set.
 * Brand tokens align with the rest of the site (`#1D68D5`, `#16B2C3`).
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, HomepageButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...rest
    } = props;

    const disabled = "disabled" in props ? props.disabled : undefined;
    const classes = buildClassName(variant, size, fullWidth, className);
    const mergedDisabled = Boolean(disabled || loading);
    const content = useButtonContent({ loading, leftIcon, rightIcon, children, size });

    if ("href" in props && props.href !== undefined && props.href !== null) {
      const { href, prefetch, replace, scroll, shallow, passHref, locale, ...anchorRest } = rest as LinkProps &
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          passHref={passHref}
          locale={locale}
          className={classes}
          aria-disabled={mergedDisabled}
          {...anchorRest}
        >
          {content}
        </Link>
      );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type ?? "button"}
        className={classes}
        disabled={mergedDisabled}
        aria-busy={loading || undefined}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

/** Class strings for composing custom elements with the same look as `<Button />`. */
export function homepageButtonClasses(options: {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}): string {
  const { variant = "primary", size = "md", fullWidth, className } = options;
  return buildClassName(variant, size, fullWidth, className);
}

export type { Variant as HomepageButtonVariant, Size as HomepageButtonSize };
