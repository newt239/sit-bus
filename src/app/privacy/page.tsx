import Footer from "#/app/_components/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | SIT Bus",
  description:
    "SIT Bus における Google アナリティクスの利用を含むプライバシーポリシーのご案内です。",
};

const PrivacyPolicy = () => {
  return (
    <>
      <main className="flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12 text-[#0f4e3c]">
        <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
        <section className="flex flex-col gap-4 leading-relaxed">
          <p>
            SIT Bus（以下「本サービス」といいます）は、東大宮駅と大宮キャンパスの間を
            運行する学バスの情報を提供するサービスです。本サービスでは、ご利用の状況を
            把握し改善につなげるため、Google が提供するアクセス解析ツール「Google
            アナリティクス」を利用しています。
          </p>
          <p>
            Google アナリティクスはクッキー（Cookie）を使用して匿名のトラフィック
            データを収集します。これにより個人を特定する情報は含まれません。収集された
            データは Google 社のプライバシーポリシーに基づいて管理されます。
          </p>
          <p>
            詳細については、
            <Link
              className="underline hover:no-underline"
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noreferrer"
            >
              Google アナリティクス利用規約
            </Link>
            および
            <Link
              className="underline hover:no-underline"
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noreferrer"
            >
              Google プライバシーポリシー
            </Link>
            をご参照ください。
          </p>
          <p>
            本サービスでは Google アナリティクスの「Google シグナル」や広告向け機能は
            利用していません。クッキーの無効化をご希望の場合は、お使いのブラウザの設定を
            ご確認ください。
          </p>
          <p>
            本ポリシーに関するお問い合わせは、
            <Link
              className="underline hover:no-underline"
              href="https://github.com/newt239/sit-bus/issues"
              target="_blank"
              rel="noreferrer"
            >
              GitHub の Issue ページ
            </Link>
            からご連絡ください。
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
