import React, { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Divider: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-b border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-sm text-gray-500">{children}</span>
      </div>
    </div>
  );
};

export default Divider;
