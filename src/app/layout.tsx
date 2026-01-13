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
    title: "Pixel Play - Creative Portfolio",
    description: "A high-performance creative portfolio showcasing Web Development, Graphic Design, and 3D Animation",
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
