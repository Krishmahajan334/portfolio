import type { Metadata } from "next";
import "./globals.css";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { AntiScrapeShield } from "@/components/AntiScrapeShield";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Krish Mahajan | Full Stack Developer & Junior Scientist",
  description: "Portfolio of Krish Mahajan, a Computer Science Engineer, National Junior Scientist, NCSC Winner from Jammu (KV), and ACSES President building high-performance scalable tech solutions.",
  keywords: [
    "Krish Mahajan",
    "Krish Mahajan Jammu",
    "Krish Jammu",
    "Krish KV",
    "Krish Mahajan NCSC",
    "Krish Mahajan NCSC winner",
    "Junior Scientist",
    "Full Stack Developer",
    "Software Engineer",
    "ACSES President",
    "IIoT Specialist",
    "Computer Science Engineer"
  ],
  authors: [{ name: "Krish Mahajan", url: "https://www.krishmahajan.dev" }],
  creator: "Krish Mahajan",
  publisher: "Krish Mahajan",
  metadataBase: new URL("https://www.krishmahajan.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Krish Mahajan | Tech Innovator & Junior Scientist",
    description: "Portfolio of Krish Mahajan (NCSC Winner, Jammu) - Full Stack Developer and IIoT Specialist.",
    url: "https://krishmahajan.dev",
    siteName: "Krish Mahajan Portfolio",
    images: [
      {
        url: "https://raw.githubusercontent.com/Krishmahajan334/Krishmahajan334/main/krish_github_banner_v2.png",
        width: 1200,
        height: 630,
        alt: "Krish Mahajan Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krish Mahajan | Junior Scientist & Developer",
    description: "Explore the projects and journey of Krish Mahajan, NCSC Winner and Full Stack Engineer.",
    images: ["https://raw.githubusercontent.com/Krishmahajan334/Krishmahajan334/main/krish_github_banner_v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/android-chrome-512x512.png",
    apple: "/assets/android-chrome-512x512.png",
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
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <InteractiveTerminal />
        <AntiScrapeShield />
        <CustomCursor />
      </body>
    </html>
  );
}
