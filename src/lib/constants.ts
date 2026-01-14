export const PROJECT_CATEGORIES = {
    WEB: 'web',
    DESIGN: 'design',
    THREE_D: '3d',
} as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[keyof typeof PROJECT_CATEGORIES];

export const QUALITY_PRESETS = {
    LOW: {
        shadows: false,
        antialias: false,
        pixelRatio: 1,
    },
    MEDIUM: {
        shadows: true,
        antialias: false,
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1,
    },
    HIGH: {
        shadows: true,
        antialias: true,
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
    },
} as const;

export const KEYBOARD_SHORTCUTS = {
    COMMAND_PALETTE: 'k',
    TOGGLE_THEME: 't',
    TOGGLE_EDIT_MODE: 'e',
} as const;

export const ROUTES = {
    HOME: '/',
    PROJECTS: '/projects',
    PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
} as const;

export const SOCIAL_LINKS = {
    LINKEDIN: 'https://www.linkedin.com/in/william-mutangadura-553253289',
    YOUTUBE: 'https://www.youtube.com/@williammutangadura6973',
    INSTAGRAM: 'https://www.instagram.com/_i_am_will.i.am_',
    WHATSAPP: 'https://wa.me/', // Placeholder since number wasn't provided, but structure is ready.
    GITHUB: 'https://github.com/ZealousContagion', // Inferred from git remote in previous turn
    EMAIL: 'william@pixelplay.dev', // Placeholder email based on domain context
} as const;
