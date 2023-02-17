import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PageHeader: React.FC<Props> = ({ children }) => {
  return <h1 className="text-lg font-medium">{children}</h1>;
};

export default PageHeader;
