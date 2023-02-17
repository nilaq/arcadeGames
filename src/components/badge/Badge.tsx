import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { cn } from "../../utils/helpers";

const badgeVariants = cva("border rounded w-fit", {
  variants: {
    variant: {
      black: "text-black border-black",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      fuchsia: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200",
      gray: "bg-gray-100 text-gray-600 border-gray-200",
      green: "bg-green-100 text-green-600 border-green-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      red: "bg-red-100 text-red-600 border-red-200",
      teal: "bg-teal-100 text-teal-600 border-teal-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
    size: {
      default: "text-xs px-1",
    },
  },
  defaultVariants: {
    variant: "blue",
    size: "default",
  },
});

export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {
  isLoading?: boolean;
}

const Badge: ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (
  { children, isLoading = false, variant, size, className, ...props },
  ref
) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </span>
  );
};

export default forwardRef(Badge);
