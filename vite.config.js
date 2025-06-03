import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ Clean, correct Vite config for React + Tailwind
export default defineConfig({
  plugins: [react(), tailwindcss()]
});
