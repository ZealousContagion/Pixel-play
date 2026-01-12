import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { GlobalPlayhead } from "@/components/shared/global-playhead";
import { CommandMenu } from "@/components/shared/command-menu";
import { Toaster } from "@/components/ui/toast";
import { SceneLayout } from "@/components/canvas/scene-layout";
import { ChatAssistant } from "@/components/shared/chat-assistant";

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
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground`}>
                <SceneLayout>
                    {/* Global 3D Elements can go here */}
                </SceneLayout>
                
                <Header />
                
                <main className="flex min-h-screen flex-col pt-14 pb-20">
                    {children}
                </main>
                
                <GlobalPlayhead />
                <CommandMenu />
                <ChatAssistant />
                <Toaster />
            </body>
        </html>
    );
}
