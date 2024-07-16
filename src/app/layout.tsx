import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raft Tracker App",
  description: "A Virtual Whiteboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" bg-[#288FF2] shadow-lg">
          <h1 className="flex p-4 items-center justify-center text-4xl text-[#F3F9FE]">Raft Tracker</h1>
        </div>
        {children}
        </body>
    </html>
  );
}
