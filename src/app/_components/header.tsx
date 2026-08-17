import Link from "next/link";

type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Link href="/" className="w-full bg-[#0f4e3c] p-4 text-center text-white">
      <header>
        <h2 className="text-center">{children}</h2>
      </header>
    </Link>
  );
};

export default Header;
