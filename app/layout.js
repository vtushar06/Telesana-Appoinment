import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Telesana - Virtual Healthcare Platform",
  description: "Connect with qualified doctors anytime, anywhere through secure video consultations",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-white`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💗 by Tushar Verma</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
