export interface Project {
    slug: string;
    title: string;
    category: 'web' | 'design' | '3d';
    role: string;
    tools: string[];
    description: string;
    featured: boolean;
    thumbnail: string;
    metrics?: {
        label: string;
        value: string;
    }[];
    viewport: {
        type: 'iframe' | 'canvas' | 'webgl';
        src?: string;
        model?: string;
    };
}

// Sample projects data
export const SAMPLE_PROJECTS: Project[] = [
    {
        slug: 'saas-dashboard',
        title: 'SaaS Analytics Dashboard',
        category: 'web',
        role: 'Full-Stack Developer',
        tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        description: 'A high-performance analytics dashboard with real-time data visualization.',
        featured: true,
        thumbnail: '/projects/saas-dashboard.webp',
        metrics: [
            { label: 'Performance Score', value: '98/100' },
            { label: 'Load Time', value: '0.8s' },
        ],
        viewport: {
            type: 'iframe',
            src: 'https://example.com/demo',
        },
    },
    {
        slug: 'brand-identity',
        title: 'Tech Startup Brand Identity',
        category: 'design',
        role: 'Brand Designer',
        tools: ['Figma', 'Illustrator', 'After Effects'],
        description: 'Complete brand identity system for a fintech startup.',
        featured: true,
        thumbnail: '/projects/brand-identity.webp',
        viewport: {
            type: 'canvas',
        },
    },
    {
        slug: 'product-animation',
        title: '3D Product Showcase',
        category: '3d',
        role: '3D Artist & Animator',
        tools: ['Blender', 'Three.js', 'React Three Fiber'],
        description: 'Interactive 3D product visualization with real-time lighting controls.',
        featured: true,
        thumbnail: '/projects/product-animation.webp',
        viewport: {
            type: 'webgl',
            model: '/models/product.glb',
        },
    },
];
