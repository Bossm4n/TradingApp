import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allow access from all network interfaces
    port: 3001,       // Set the port
    strictPort: true, // Fail if the port is already in use
    hmr: {
      host: '0.0.0.0', // Ensure HMR can work on all network interfaces
    },
  },
});
