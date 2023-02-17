import React, { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Subtlest: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn("text-xs text-zinc-500", className)} {...props}>
      {children}
    </p>
  );
};

export default Subtlest;
