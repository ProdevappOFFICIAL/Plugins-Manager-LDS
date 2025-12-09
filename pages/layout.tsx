import type { Metadata } from "next";

import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <main className="flex h-screen w-screen flex-col items-center justify-center text-[10px] ">
        {children}

        </main>
      </body>
    </html>
  );
}
