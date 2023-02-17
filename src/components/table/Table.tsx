import type { HTMLAttributes } from "react";
import React from "react";
import { cn } from "../../utils/helpers";
export const TableContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      {children}
    </div>
  );
};

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <table className={cn("table w-full border-collapse", className)} {...props}>
      {children}
    </table>
  );
};

export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead className={cn("py-3 text-left", className)} {...props}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => {
  return <tbody {...props}>{children}</tbody>;
};

export const Th: React.FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => {
  return <th {...props}>{children}</th>;
};

export const Tr: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => {
  return <tr {...props}>{children}</tr>;
};

export const Td: React.FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td className={cn("border-y border-zinc-600 py-3", className)} {...props}>
      {children}
    </td>
  );
};
