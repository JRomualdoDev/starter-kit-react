import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     host: '0.0.0.0',
    //     port: 5173,
    //     hmr: {
    //         host: 'localhost',  // Para o navegador acessar
    //         port: 5173,
    //         protocol: 'ws',     // WebSocket simples
    //     },
    //     watch: {
    //         usePolling: true,
    //         interval: 1000,       
    //     },
    // },
});