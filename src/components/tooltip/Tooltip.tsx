import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "../../utils/helpers";

interface Props {
  children: React.ReactNode;
  text: string;
}

const TooltipRoot = ({ ...props }) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props} />
  </TooltipPrimitive.Provider>
);
TooltipRoot.displayName = TooltipPrimitive.Tooltip.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 z-50 max-w-lg overflow-hidden rounded-md border border-zinc-100 bg-white px-3 py-1.5 text-center text-sm text-zinc-700 shadow-md",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <TooltipPrimitive.Arrow className="fill-current text-zinc-200" />
        <span className="block text-xs leading-none">{text}</span>
      </TooltipContent>
    </TooltipRoot>
  );
};

export { Tooltip, TooltipTrigger };
