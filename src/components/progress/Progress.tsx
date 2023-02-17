import { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface Props {
  value: number;
  max: number;
}

const Progress: React.FC<HTMLAttributes<HTMLDivElement> & Props> = ({
  className,
  value,
  max,
  ...props
}) => {
  const percentage = (value / max) * 100;
  return (
    <div
      className={cn("h-2 w-full rounded-full bg-zinc-200", className)}
      {...props}
    >
      <div
        className={
          "flex h-2 flex-col items-end rounded-full bg-black transition-all"
        }
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default Progress;
