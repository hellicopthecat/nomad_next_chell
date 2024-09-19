import type {Metadata} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {default: "HOME | Billionaire", template: "%s | Billionaire"},
  description: "Billionaire Person ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            padding: 40,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
