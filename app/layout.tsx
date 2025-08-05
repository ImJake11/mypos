import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./lib/redux/slice/ReduxProvider";

const poppins = Poppins({
  weight: ['500', '600', '700', '800'], // Specify the weights you need
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});


export const metadata: Metadata = {
  title: "Nexustock",
  description: "A Full Stack POS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased`}
      >
        <ReduxProvider children={children} />
      </body>
    </html>
  );
}
