import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    // Theme
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;

    // 3D Quality Settings
    quality: 'low' | 'medium' | 'high';
    setQuality: (quality: 'low' | 'medium' | 'high') => void;

    // Command Palette
    commandPaletteOpen: boolean;
    setCommandPaletteOpen: (open: boolean) => void;

    // Edit Mode
    editMode: boolean;
    setEditMode: (enabled: boolean) => void;

    // Unified Terminal
    terminalOpen: boolean;
    setTerminalOpen: (open: boolean) => void;
    terminalMode: 'ai' | 'sys';
    setTerminalMode: (mode: 'ai' | 'sys') => void;
    logs: { id: string; message: string; timestamp: string; type: 'info' | 'warn' | 'error' | 'sys' }[];
    addLog: (message: string, type?: 'info' | 'warn' | 'error' | 'sys') => void;
    clearLogs: () => void;

    // Performance Scaler
    fps: number;
    setFps: (fps: number) => void;
    performanceMode: 'turbo' | 'eco';
    setPerformanceMode: (mode: 'turbo' | 'eco') => void;
    autoScale: boolean;
    setAutoScale: (enabled: boolean) => void;

    // Blueprint Mode
    blueprintMode: boolean;
    setBlueprintMode: (enabled: boolean) => void;

    // Brand Architect
    brand: {
        name: string;
        logo: string | null;
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        };
        voice: string;
        iconSet: 'minimal' | 'geometric' | 'organic';
    };
    updateBrand: (data: Partial<AppState['brand']>) => void;

    // Audio System
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // ... existing state ...
            theme: 'dark',
            // ... (keep previous simplified theme logic)
            setTheme: (theme) => {
                const doc = document.documentElement;
                doc.classList.toggle('dark', theme === 'dark');
                set({ theme });
            },

            quality: 'high',
            setQuality: (quality) => set({ quality }),

            commandPaletteOpen: false,
            setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

            editMode: false,
            setEditMode: (enabled) => set({ editMode: enabled }),

            blueprintMode: false,
            setBlueprintMode: (enabled: boolean) => set({ blueprintMode: enabled }),

            // Unified Terminal
            terminalOpen: false,
            setTerminalOpen: (open) => set({ terminalOpen: open }),
            terminalMode: 'ai',
            setTerminalMode: (terminalMode) => set({ terminalMode }),
            logs: [{ 
                id: '1', 
                message: 'ENGINE_TERMINAL_v2.0 initialized...', 
                timestamp: new Date().toLocaleTimeString(), 
                type: 'sys' 
            }],
            addLog: (message, type = 'info') => set((state) => ({
                logs: [
                    ...state.logs.slice(-49), // Keep last 50 logs
                    { 
                        id: Math.random().toString(36).substr(2, 9), 
                        message, 
                        timestamp: new Date().toLocaleTimeString(), 
                        type 
                    }
                ]
            })),
            clearLogs: () => set({ logs: [] }),

            // Performance Scaler
            fps: 60,
            setFps: (fps) => set({ fps }),
            performanceMode: 'turbo',
            setPerformanceMode: (performanceMode) => set({ performanceMode }),
            autoScale: true,
            setAutoScale: (autoScale) => set({ autoScale }),

            // Brand Architect
            brand: {
                name: "New System",
                logo: null,
                colors: {
                    primary: "#3cb4e7",
                    secondary: "#ffc423",
                    accent: "#b54d50",
                    background: "#0f1b4c"
                },
                voice: "Professional, technical, and forward-thinking.",
                iconSet: "minimal"
            },
            updateBrand: (data) => set((state) => ({ 
                brand: { ...state.brand, ...data } 
            })),

            // Audio System
            soundEnabled: true,
            setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
        }),
        {
            name: 'pixel-play-storage',
        }
    )
);
