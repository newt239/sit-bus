import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { BIZ_UDPGothic as NextFont } from "next/font/google";

import "#/app/globals.css";

export const metadata: Metadata = {
  title: "SIT Bus",
  description: "次の学バスを表示",
};

export const dynamic = "force-dynamic";

const BIZ_UDPGothic = NextFont({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={BIZ_UDPGothic.className}>
        <div className="flex h-svh flex-col items-center justify-between">
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-65SW5BS9T6" />
    </html>
  );
}
