import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    // Theme
    theme: string;
    setTheme: (theme: string) => void;
    availableThemes: { id: string; name: string; type: 'dark' | 'light' }[];

    // 3D Quality Settings
    quality: 'low' | 'medium' | 'high';
    setQuality: (quality: 'low' | 'medium' | 'high') => void;

    // Command Palette
    commandPaletteOpen: boolean;
    setCommandPaletteOpen: (open: boolean) => void;

    // Edit Mode
    editMode: boolean;
    setEditMode: (enabled: boolean) => void;

    // Chat Assistant
    chatOpen: boolean;
    setChatOpen: (open: boolean) => void;

    // Blueprint Mode
    blueprintMode: boolean;
    setBlueprintMode: (enabled: boolean) => void;

    // Creative Console
    consoleOpen: boolean;
    setConsoleOpen: (open: boolean) => void;
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
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // ... existing state ...
            theme: 'dark-modern',
            setTheme: (theme) => {
                // Remove all theme classes from document element
                const doc = document.documentElement;
                doc.classList.forEach(className => {
                    if (className.startsWith('theme-')) doc.classList.remove(className);
                });
                doc.classList.add(`theme-${theme}`);
                // Also handle light/dark class for system/shadcn compatibility
                const isLight = theme.includes('light');
                doc.classList.toggle('dark', !isLight);
                
                set({ theme });
            },
            availableThemes: [
                { id: 'dark-modern', name: 'Dark Modern', type: 'dark' },
                { id: 'tokyo-night', name: 'Tokyo Night', type: 'dark' },
                { id: 'synthwave', name: 'Synthwave \'84', type: 'dark' },
                { id: 'monokai', name: 'Monokai', type: 'dark' },
                { id: 'github-light', name: 'GitHub Light', type: 'light' },
                { id: 'solarized-dark', name: 'Solarized Dark', type: 'dark' },
            ],

            quality: 'high',
            setQuality: (quality) => set({ quality }),

            commandPaletteOpen: false,
            setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

            editMode: false,
            setEditMode: (enabled) => set({ editMode: enabled }),

            chatOpen: false,
            setChatOpen: (open) => set({ chatOpen: open }),

            blueprintMode: false,
            setBlueprintMode: (enabled) => set({ blueprintMode: enabled }),

            // Creative Console
            consoleOpen: false,
            setConsoleOpen: (open) => set({ consoleOpen: open }),
            logs: [{ 
                id: '1', 
                message: 'CREATIVE_ENGINE_v1.0.0 initialized...', 
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
        }),
        {
            name: 'pixel-play-storage',
        }
    )
);
