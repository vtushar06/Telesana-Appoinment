// Root layout - wraps entire app with providers
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // Authentication provider
import { Toaster } from "sonner"; // Toast notifications
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Telesana - Virtual Healthcare Platform",
  description: "Connect with qualified doctors anytime, anywhere through secure video consultations",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider> {/* Wraps app with Clerk auth */}
      <html lang="en" className="light">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-white`}>
          <Header /> {/* Navigation bar */}
          <main className="min-h-screen">{children}</main>
          <Toaster richColors /> {/* Global toast notifications */}
          <footer className="bg-gray-50 border-t border-gray-200 py-12">
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
