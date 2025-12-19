import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Use widely available Google fonts instead of a non-existent "Geist" export
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Face Access System",
  description: "Biometric enrollment and verification UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.variable} ${jetMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
