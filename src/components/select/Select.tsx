import {
  forwardRef,
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
} from "react";
import { cn } from "../../utils/helpers";

const Select: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
> = ({ children, className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "text-md flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-transparent py-2 px-3 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 active:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default forwardRef(Select);
