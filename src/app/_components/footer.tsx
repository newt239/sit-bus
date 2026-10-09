import Link from "next/link";

const links = [
  { label: "トップ", url: "/" },
  {
    label: "プライバシーポリシー",
    url: "/privacy",
  },
  { label: "GitHub", url: "https://github.com/newt239/sit-bus" },
  { label: "Twitter", url: "https://twitter.com/newt239" },
];

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-4 px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+2.5rem)]">
      {links.map((link) => (
        <Link
          key={link.url}
          className="text-[#0f4e3c] underline underline-offset-4 hover:no-underline"
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
