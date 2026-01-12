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
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // Theme
            theme: 'dark',
            setTheme: (theme) => set({ theme }),

            // 3D Quality
            quality: 'high',
            setQuality: (quality) => set({ quality }),

            // Command Palette
            commandPaletteOpen: false,
            setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

            // Edit Mode
            editMode: false,
            setEditMode: (enabled) => set({ editMode: enabled }),
        }),
        {
            name: 'pixel-play-storage',
        }
    )
);
