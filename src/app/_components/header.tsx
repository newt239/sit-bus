type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <a href="/" className="w-full p-4 text-center bg-[#0f4e3c] text-white">
      <header>
        <h2 className="text-center">{children}</h2>
      </header>
    </a>
  );
};

export default Header;
