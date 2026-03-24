import { ThemeProvider } from "@/app/providers/theme-provider";
import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";
import { ClerkProvider, Show } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NEXT APP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn("font-sans", inter.variable)}
      >
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="h-screen md:w-[90%] mx-auto sm:w-screen flex justify-center items-center">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
