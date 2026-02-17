"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-center gap-8 py-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
          <a
            href="/todo"
            className={`text-lg font-medium hover:underline${
              pathname === "/todo" || pathname === "/" ? " text-blue-600 underline" : ""
            }`}
          >
            Tasks
          </a>
          <a
            href="/forecast"
            className={`text-lg font-medium hover:underline${
              pathname === "/forecast" ? " text-blue-600 underline" : ""
            }`}
          >
            Forecast
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
