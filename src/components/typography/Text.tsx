import React, { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Text: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn("text-zinc-600", className)} {...props}>
      {children}
    </p>
  );
};

export default Text;
