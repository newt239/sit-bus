import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIT Bus",
  description: "次の学バスを表示",
};

export const dynamic = "force-dynamic";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="flex h-svh flex-col items-center justify-between">
          <div className="flex h-5/6 flex-col items-center justify-between p-12">
            {children}
          </div>
          <div className="flex flex-wrap h-1/6 items-center justify-center p-12 gap-4">
            {links.map((link) => (
              <a
                key={link.url}
                className=" text-blue-500 hover:underline"
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
              >
                {link.label}
              </a>
            ))}
          </div>
        </main>
      </body>
      <GoogleAnalytics gaId="G-65SW5BS9T6" />
    </html>
  );
}
