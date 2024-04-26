type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="w-full p-4 text-center bg-[#0f4e3c] text-white">
      <h2 className="text-center">{children}</h2>
    </header>
  );
};

export default Header;
