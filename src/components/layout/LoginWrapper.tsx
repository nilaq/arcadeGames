import type { HTMLAttributes } from "react";

const LoginWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className="bg-gradient-to-r from-fuchsia-100 to-blue-200">
      <div className="min-w-screen flex min-h-screen p-8">
        <div
          className={`mx-auto flex w-full flex-col justify-center gap-2 ${
            className ? className : "max-w-sm"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;
