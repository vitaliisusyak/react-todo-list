import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('children', children)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-center gap-8 py-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
          <a href="/todo" className="text-lg font-medium hover:underline">Todo List</a>
          <a href="/forecast" className="text-lg font-medium hover:underline">Forecast</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
