import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/components/header";
import { DesktopSidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Registry",
  description: "An opinionated shadcn/ui component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex justify-center">
            <DesktopSidebar />
            <main className="flex w-full flex-col items-center p-8 sm:w-[720px]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
