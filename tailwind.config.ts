import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        background: "#0A0A0A",
        card: "#121018",
        primary: "#6A0DAD",
        gold: "#D4AF37",
        copy: "#F6F1FF",
        muted: "#B7ABC8"
      },
      boxShadow: {
        glow: "0 0 24px rgba(212, 175, 55, 0.25)",
        neon: "0 0 42px rgba(106, 13, 173, 0.28)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(106,13,173,0.5), rgba(10,10,10,0.96) 55%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(106,13,173,0.14), rgba(18,16,24,0.94))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(212, 175, 55, 0.18)" },
          "50%": { boxShadow: "0 0 32px rgba(212, 175, 55, 0.3)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
