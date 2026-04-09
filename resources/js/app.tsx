// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import '../css/app.css';
// import { initializeTheme } from './hooks/use-appearance';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => (title ? `${title} - ${appName}` : appName),
//     resolve: (name) =>
//         resolvePageComponent(
//             `./pages/${name}.tsx`,
//             import.meta.glob('./pages/**/*.tsx'),
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(
//             <StrictMode>
//                 <App {...props} />
//             </StrictMode>,
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

// // This will set light / dark mode on load...
// initializeTheme();

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { route } from 'ziggy-js';
import { Toaster } from 'sonner';

import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),

    setup({ el, App, props }) {
        const root = createRoot(el);

        // ✅ GLOBAL route() SETUP
        const ziggy = (props as any).initialPage.props.ziggy;

        (window as any).route = (
            name: string,
            params?: any,
            absolute?: boolean,
        ) => route(name, params, absolute, ziggy);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },

    progress: {
        color: '#4B5563',
    },
});

// Theme init
initializeTheme();
