import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/helpers";
import {Loader2} from "lucide-react";

const buttonVariants = cva(
    "inline-flex gap-2 items-center justify-center rounded-md text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "rounded-full bg-black font-bold tracking-wide " +
                    "text-transparent bg-gradient-to-r from-[#9C9E9F] to-[#FDFFFF] bg-clip-text"
            },
            size: {
                default: "py-1 px-6"
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

const MetalButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
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
        <div className="p-[1.5px] bg-gradient-to-tr from-[#383A3B] via-[#505254] to-[#F8FAFB] rounded-full">
            <div className="bg-black rounded-full">
                <button
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                    disabled={disabled || isLoading}
                    type={type}
                    {...props}
                >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin"/>}
                    {children}
                </button>
            </div>
        </div>
    );
};

export default forwardRef(MetalButton);
