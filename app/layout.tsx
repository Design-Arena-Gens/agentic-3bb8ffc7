import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analisa Forex Gold",
  description: "Dashboard analisa forex gold dengan insight teknikal dan fundamental."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
