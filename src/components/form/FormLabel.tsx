import { LabelHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const FormLabel: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={cn(
        "text-sm font-medium text-zinc-700",
        "text-left",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default FormLabel;
