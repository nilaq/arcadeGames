import type { LinkProps } from "next/link";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";
import Title from "../typography/Title";

const FooterLink: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps
> = ({ children, className, ...props }) => {
  return (
    <Link
      className={cn("w-fit text-zinc-500 hover:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

const FooterColumn: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const Footer = () => {
  return (
    <footer className="border-t border-gray-500 p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="xs:grid-cols-1 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <FooterColumn>
            <Title>Name</Title>
          </FooterColumn>
          <FooterColumn>
            <Title>Legal</Title>
            <FooterLink href="/tos">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <Title>General</Title>
            <FooterLink href="/login">Login</FooterLink>
            <FooterLink href="/about">About</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <Title>Help</Title>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="mailto:hello@mail.com">Contact</FooterLink>
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
