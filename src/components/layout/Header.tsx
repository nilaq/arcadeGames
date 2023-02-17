import Link from "next/link";
import Button from "../buttons/Button";
import Title from "../typography/Title";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-transparent">
      <div className="mx-auto flex max-w-[1440px] flex-row items-center justify-between p-8">
        <Title>Name</Title>
        <div className="flex flex-row gap-2">
          <Link href="/login">
            <Button>Apply Now</Button>
          </Link>
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
