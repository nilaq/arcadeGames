import type { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Skeleton: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn("bg-zinc-200", className)}>
      {children}
    </div>
  );
};

export default Skeleton;
