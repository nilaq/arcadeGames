import { X } from "lucide-react";
import { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface TagProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Tag: React.FC<TagProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "leading-sm flex w-fit flex-row items-center gap-1 rounded-md border border-gray-200 bg-white p-0.5 px-2 text-sm",
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </div>
  );
};

export const SelectableTag = forwardRef<
  HTMLInputElement,
  Omit<TagProps, "rightIcon"> & InputHTMLAttributes<HTMLInputElement>
>(({ children, leftIcon, className, ...props }, ref) => {
  return (
    <label
      className={cn(
        "leading-sm flex cursor-pointer flex-row items-center gap-1 rounded-md border border-zinc-200 bg-white p-0.5 px-2 text-sm font-medium",
        className
      )}
    >
      <input type="checkbox" ref={ref} className="peer hidden" {...props} />
      <div className="opacity-40 peer-checked:opacity-100">
        {leftIcon}
        {children}
      </div>
      <X className="hidden peer-checked:flex" size={16} />
    </label>
  );
});

SelectableTag.displayName = "SelectableTag";

export const TagGroup: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`my-1 flex flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
