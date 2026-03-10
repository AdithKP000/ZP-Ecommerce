import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../component_library/Navbar";
import MuiProvider from "./MuiProvider";
import { StoreProvider } from "@/core_components/state/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COSMO",
  description: "Your Online Cosmetic Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MuiProvider>
          <StoreProvider>
            <Navbar exclude={["/user/auth/login", "/user/auth/signup"]} />
            {children}
          </StoreProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
