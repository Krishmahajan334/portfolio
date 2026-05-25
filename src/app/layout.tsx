import type { Metadata } from "next";
import "./globals.css";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export const metadata: Metadata = {
  title: "Krish Mahajan | Computer Science Engineer & Tech Innovator",
  description: "Computer Science Engineer, innovator, and product builder crafting high-performance software, intelligent systems, and scalable tech solutions. Associate with the Ministry of Science & Technology and GeeksforGeeks Campus Mantri.",
  icons: {
    icon: "/assets/android-chrome-512x512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth dark">
      <body className="min-h-full flex flex-col bg-[#050816] text-[#ededed] font-sans selection:bg-[#00F5FF]/30 selection:text-white overflow-x-hidden">
        {children}
        <InteractiveTerminal />
      </body>
    </html>
  );
}
