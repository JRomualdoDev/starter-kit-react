import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',  // Garante que o Vite escute em todas as interfaces
        port: 5173,
        hmr: {
            host: 'host.docker.internal',  // Define o host para hot reloading
        },
    },
});