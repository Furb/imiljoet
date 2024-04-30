import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";

const darker_font = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--darker-font",
});

export const metadata: Metadata = {
  title: "I Miljøet",
  description: "- Et kontorkollektiv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='{darker_font.variable}'>{children}</body>
    </html>
  );
}
