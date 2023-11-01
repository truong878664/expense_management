import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "../components/app/Footer";
import ReduxProvider from "@/Providers";
import NotSupportedScreen from "./NotSupportedScreen";
import favicon from "./favicon.ico";
const nunito = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Expense management",
  description: "App to manage your expenses",
  icons: {
    icon: {
      url: favicon.src + "?v=4",
      type: "image/ico",
    },
  },
};

type RootLayout = {
  children: React.ReactNode;
  modal: React.ReactNode;
};
export default function RootLayout({ children, modal }: RootLayout) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body className={nunito.className}>
        <ReduxProvider>
          <main className="flex-1 overflow-hidden">{children}</main>
          {modal}
          <Footer />
        </ReduxProvider>
        <NotSupportedScreen />
      </body>
    </html>
  );
}
