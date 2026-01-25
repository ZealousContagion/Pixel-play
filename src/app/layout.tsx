import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { GlobalPlayhead } from "@/components/shared/global-playhead";
import { CommandMenu } from "@/components/shared/command-menu";
import { Toaster } from "@/components/ui/toast";
import { SceneLayout } from "@/components/canvas/scene-layout";
import { UnifiedTerminal } from "@/components/shared/unified-terminal";
import { ThemeSync } from "@/components/shared/theme-sync";
import { GlobalLoader } from "@/components/shared/global-loader";
import { DebugOverlay } from "@/components/shared/debug-overlay";
import EngineLoading from "@/components/shared/engine-loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Pixel Play | Creative Engineering",
        template: "%s | Pixel Play"
    },
    description: "A high-performance creative portfolio showcasing Web Development, Graphic Design, and 3D Animation. Powered by Next.js and React Three Fiber.",
    keywords: ["Creative Developer", "3D Web", "React Three Fiber", "Next.js", "Portfolio", "WebGL", "Frontend Engineer"],
    authors: [{ name: "William Mutangadura", url: "https://pixelplay.dev" }],
    creator: "William Mutangadura",
    metadataBase: new URL("https://pixelplay.dev"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://pixelplay.dev",
        title: "Pixel Play | Creative Engineering",
        description: "A high-performance creative portfolio showcasing Web Development, Graphic Design, and 3D Animation.",
        siteName: "Pixel Play",
        images: [
            {
                url: "/og-image.png", // Needs to be added to public/
                width: 1200,
                height: 630,
                alt: "Pixel Play Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pixel Play | Creative Engineering",
        description: "A high-performance creative portfolio showcasing Web Development, Graphic Design, and 3D Animation.",
        images: ["/og-image.png"],
        creator: "@pixelplay", 
    },
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const storage = localStorage.getItem('pixel-play-storage');
                                    if (storage) {
                                        const state = JSON.parse(storage).state;
                                        const theme = state.theme;
                                        if (theme === 'dark') {
                                            document.documentElement.classList.add('dark');
                                        } else {
                                            document.documentElement.classList.remove('dark');
                                        }
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground`}>
                <ThemeSync />
                <Suspense fallback={null}>
                    <GlobalLoader />
                </Suspense>
                <SceneLayout>
                    {/* Global 3D Elements can go here */}
                </SceneLayout>
                
                <Header />
                
                <main className="flex min-h-screen flex-col pt-14 pb-20 relative">
                    <Suspense fallback={<EngineLoading />}>
                        {children}
                    </Suspense>
                </main>
                
                <Footer />
                <GlobalPlayhead />
                <CommandMenu />
                <UnifiedTerminal />
                <DebugOverlay />
                <Toaster />
            </body>
        </html>
    );
}
