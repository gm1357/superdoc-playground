import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperDoc Playground",
  description: "SuperDoc Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
