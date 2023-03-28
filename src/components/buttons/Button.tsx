import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { cn } from "../../utils/helpers";

const buttonVariants = cva(
    "inline-flex gap-2 items-center justify-center rounded-md text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    "bg-zinc-900 text-white hover:bg-zinc-700 data-[state=open]:bg-zinc-600",
                outline: "bg-transparent border border-zinc-200 hover:bg-zinc-100",
                subtle: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
                ghost:
                    "bg-transparent hover:bg-zinc-100 data-[state=open]:bg-transparent",
                link: "bg-transparent underline-offset-4 hover:underline text-zinc-900 hover:bg-transparent",
                danger: "bg-red-600 text-white hover:bg-red-500",
                blue: "bg-blue-400 text-white hover:bg-blue-500",
            },
            size: {
                default: "h-10 py-2 px-4",
                xs: "h-8 px-2 text-sm",
                sm: "h-9 px-2 rounded-md text-sm",
                lg: "h-11 px-8 rounded-md"
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    {
        children,
        isLoading = false,
        disabled = false,
        type = "button",
        variant,
        size,
        fullWidth,
        className,
        ...props
    },
    ref
) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size, fullWidth, className }))}
            disabled={disabled || isLoading}
            type={type}
            {...props}
        >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default forwardRef(Button);
