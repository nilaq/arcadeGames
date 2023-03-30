import React, { forwardRef } from "react";
import { cn } from "../../utils/helpers";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "text-sm text-slate-700 flex h-10 w-full rounded-md border-2 border-slate-300 bg-transparent py-1.5 px-3 " +
            "placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 " +
            "focus:ring-offset-2 active:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
