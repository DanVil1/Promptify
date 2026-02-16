import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Scriptorum",
  description: "A simple prompt manager for ChatGPT and other LLMs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
