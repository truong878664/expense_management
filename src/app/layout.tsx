import "./globals.css";
import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import Footer from "../components/app/Footer";
import ReduxProvider from "@/Providers";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense management app",
  description: "App to manage your expenses",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inconsolata.className} flex h-full w-full flex-col`}>
        <ReduxProvider>
          <main className="flex-1 overflow-hidden">{children}</main>
          {modal}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
