import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Navbar from "./_navigation/navbar";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LifeIndex",
  description: "A place to track your habits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning="true">
      <head></head>
      <body className={inter.className} cz-shortcut-listen="true">
        {/* remove the "cz-shortcut-listen" in prod, it's only to suppress hydration warnings from the colorzilla extension */}
        <Providers>
          <header
            className="sticky top-0 border-b flex flex-row items-center"
            style={{ minHeight: "6vh" }}
          >
            <Navbar />
          </header>
          <main>{children}</main>
          <footer className="fixed bottom-0 w-full bg-background py-1">
            <p className="text-xs text-muted-foreground text-center">
              Free to use. Made with ❤️ by{" "}
              <Link href="/about" className="underline">
                Jonas
              </Link>
            </p>
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
