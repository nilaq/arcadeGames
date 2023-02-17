import { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const FormControl: React.FC<HTMLAttributes<HTMLFieldSetElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <fieldset className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </fieldset>
  );
};

export default FormControl;
