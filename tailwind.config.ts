import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
    darkMode: 'class',

    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.ts',
        './resources/**/*.jsx',
        './resources/**/*.tsx',
    ],

    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },

        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',

                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },

                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },

                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },

                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },

                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },

                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },

                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },

                /* LemonGard Brand Colors */

                yellow: {
                    50: 'hsl(48 100% 96%)',
                    100: 'hsl(48 96% 89%)',
                    200: 'hsl(48 97% 77%)',
                    300: 'hsl(46 97% 65%)',
                    400: 'hsl(43 96% 56%)',
                    500: 'hsl(38 92% 50%)',
                    600: 'hsl(32 95% 44%)',
                    700: 'hsl(26 90% 37%)',
                    800: 'hsl(23 83% 31%)',
                    900: 'hsl(22 78% 26%)',
                },

                navy: {
                    600: 'hsl(224 76% 33%)',
                    700: 'hsl(224 71% 25%)',
                    800: 'hsl(222 47% 11%)',
                },
            },

            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },

            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },

                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
            },

            animation: {
                'fade-in': 'fade-in 0.6s ease-out',
                float: 'float 3s ease-in-out infinite',
            },

            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },

    plugins: [tailwindcssAnimate],
};

export default config;
