import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	build: {
		sourcemap: true
	},
	plugins: [react()],
	base: '/al-knowledge-hub/',
	server: {
		port: 3000,
		open: true
	}
});
