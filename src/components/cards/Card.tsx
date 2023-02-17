import React, { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Container
      className={cn(
        "rounded-md border border-zinc-200 bg-white p-4",
        className
      )}
      {...props}
    >
      {children}
    </Container>
  );
};

export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};
