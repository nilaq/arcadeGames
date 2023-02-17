import { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Heading: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn("text-2xl font-medium", className)} {...props}>
      {children}
    </h1>
  );
};

export default Heading;
