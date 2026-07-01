import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer btn-shimmer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-teal to-teal/80 text-sand hover:from-teal-light hover:to-teal shadow-lg shadow-teal/25 hover:shadow-teal/40 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-teal/30 bg-white/[0.03] text-sand hover:bg-teal/10 hover:border-teal-light/50 backdrop-blur-sm",
        ghost: "text-sand/80 hover:bg-white/5 hover:text-sand",
        gold: "bg-gradient-to-r from-gold/80 to-gold text-background hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20",
      },
      size: {
        default: "h-12 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };