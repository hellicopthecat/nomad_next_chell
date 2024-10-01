import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-800 w-dvw h-dvh p-10">
        <main className="h-full ">{children}</main>
      </body>
    </html>
  );
}
