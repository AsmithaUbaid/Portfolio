import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteProvider } from "@/lib/providers";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — AI Engineer | LLMs, RAG & Agentic Systems`,
  description: profile.subheadline,
  metadataBase: new URL("https://asmithaubaid.dev"),
  openGraph: {
    title: `${profile.name} — AI Engineer`,
    description: profile.subheadline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer`,
    description: profile.subheadline,
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
