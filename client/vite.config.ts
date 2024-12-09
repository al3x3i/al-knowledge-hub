import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

dotenv.config({
	path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
});

// https://vite.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [react()],
	base: '/git@github.com:al3x3i/al-knowledge-hub.git',
	server: {
		port: 3000,
		open: true,
		proxy: {
			'/api': {
				target: process.env.SERVER_API_URL,
				// target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
