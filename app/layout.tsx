import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import App from "./App";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TaskSphere",
  description:
    "A comprehensive full-stack project management app designed for seamless collaboration and task tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Navbar />
        <App>{children}</App>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
