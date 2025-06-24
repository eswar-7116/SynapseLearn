import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { dark } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SynapseLearn",
  description: "Learn by doing - AI-generated tasks for any topic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="sticky top-0 z-30 w-full bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
            >
              Synapse<span className="text-purple-400">Learn</span>
            </Link>
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 ring-2 ring-purple-500/30 hover:ring-purple-400/50 transition-all duration-200",
                      userButtonPopoverCard:
                        "bg-slate-800 border border-white/10",
                      userButtonPopoverActionButton:
                        "text-gray-200 hover:bg-white/10",
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
