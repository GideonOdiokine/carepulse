import type { Metadata,Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

 
// export const viewport: Viewport = {
 
//   // Also supported by less commonly used
//   // interactiveWidget: 'resizes-visual',
// }

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
  viewport: {
     width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      /> */}
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-mont antialiased",
          montserrat.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
