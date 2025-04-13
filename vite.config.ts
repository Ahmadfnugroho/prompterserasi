// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/prompterserasi/", // Sesuaikan dengan nama repo
  plugins: [react()],
});
