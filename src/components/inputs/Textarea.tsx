import type { ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

const Textarea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex h-20 w-full rounded-md border border-zinc-300 bg-transparent py-2 px-3 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      ref={ref}
    />
  );
};

export default forwardRef(Textarea);
