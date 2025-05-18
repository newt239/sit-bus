import Link from "next/link";

const links = [
  {
    label: "現在時刻",
    url: "/",
  },
  {
    label: "公式の時刻表",
    url: "http://bus.shibaura-it.ac.jp/ts/today_sheet.php",
  },
  { label: "GitHub", url: "https://github.com/newt239/sit-bus" },
  { label: "Twitter", url: "https://twitter.com/newt239" },
];

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-wrap h-1/6 items-center justify-center p-12 gap-4">
      {links.map((link) => (
        <Link
          key={link.url}
          className=" text-[#0f4e3c] hover:underline"
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : "_self"}
        >
          {link.label}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
