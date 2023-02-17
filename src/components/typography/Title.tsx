import { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Title: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn("text-md font-medium", className)} {...props}>
      {children}
    </h1>
  );
};

export default Title;
