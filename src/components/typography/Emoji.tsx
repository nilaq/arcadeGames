import { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Emoji: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn("text-6xl", className)} {...props}>
      {children}
    </h1>
  );
};

export default Emoji;
