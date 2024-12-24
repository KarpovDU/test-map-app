import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: "Map app",
  description: "Test project with map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
