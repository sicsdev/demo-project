/** @type {import('tailwindcss').Config} */
import color from "tailwindcss/colors";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: "#2563eb",
      voilet: "#5B00CC",
      black: "#000000",
      "soft-green": "#53CB89",
      "soft-blue": "#59F2F6",
      "soft-orange": "#FFB600",
      fuchsia: color.blue[600],
      pink: color.pink[700],
      yellow: color.yellow[100],
      "home-gradient-shade": "rgb(0,7,36);",
      heading: "#09162A",
      cyan: color.cyan[100],
      "cyan-50": color.cyan[50],
      background: color.slate[800],
      border: color.slate[400],
      input_color: color.gray[400],
      btn_y_main: color.yellow[300],
      btn_y_hover: color.yellow[500],
      btn_p_main: color.purple[700],
      btn_p_hover: color.purple[800],
      background_color: color.slate[50],
      "slate-light": color.slate[100],
      orange: "#fb923c",
      neon: "#a3e635",
      sky: "#60a5fa",
      "sky-2": "#0369a1",
      bot: "#0057FF",
      "time-bot": "#60a5fa",
      card_bg: "#e4e4e7",
      table_bg: "#f1fbfd",
      custom_text: "#E8E8E8",
      "custom-small": "#8ed1fc",
      "first-section-color": "#7ec1ec",
      "text-dark-color": "#36454F",
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': '#2563eb',
      'voilet': "#5B00CC",
      'black': '#000000',
      'soft-green': "#53CB89",
      'soft-blue': "#59F2F6",
      'soft-orange': "#FFB600",
      'fuchsia': color.blue[600],
      'pink': color.pink[700],
      'yellow': color.yellow[100],
      'home-gradient-shade': "rgb(0,7,36);",
      'heading': "#09162A",
      'cyan': color.cyan[100],
      'cyan-50': color.cyan[50],
      'background': color.slate[800],
      'border': color.slate[400],
      'input_color': color.gray[400],
      'btn_y_main': color.yellow[300],
      'btn_y_hover': color.yellow[500],
      'btn_p_main': color.purple[700],
      'btn_p_hover': color.purple[800],
      'background_color': color.slate[50],
      'slate-light': color.slate[100],
      'orange': '#fb923c',
      'neon': '#a3e635',
      'sky': '#60a5fa',
      'sky-2': '#0369a1',
      'bot': "#0057FF",
      'time-bot': "#60a5fa",
      'card_bg':"#e4e4e7",
      "table_bg":"#f1fbfd",
      'sidebar':"rgb(18, 17, 66)",
      'linkhover':"rgb(40, 47, 92)",
      'headone':"rgb(18, 17, 66)",
      'danger':"#dc2626",
      'modal':"#fef2f2",
      'gray': "#e4e4e7",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "home-gradient":
          "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
        "type-section":
          "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "75%": {
            width: "75%",
          },
          "100%": {
            width: "100%",
          },
        },
        thinking: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "25%": {
            width: "25%",
          },
          "50%": {
            width: "50%",
          },
          "75%": {
            width: "75%",
          },
          "100%": {
            width: "100%",
          },
        },
        wiggle: {
          "0%": { height: "200px", visibility: "hidden", overflow: "hidden" },
          "5%": { height: "300px", visibility: "hidden", overflow: "hidden" },
          "100%": { height: "536px" },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
        bottoggle: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        backbottoggle: {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        chattile: {
          "0%": { width: "15%" },
          "100%": { width: "75%" },
        },
      },
      animation: {
        thinking: "typing .5s steps(20) infinite alternate, blink .5s infinite",
        typing: "typing 3s steps(50)  alternate, blink .5s",
        wiggle: "wiggle .5s ease-in-out",
        bottoggle: "bottoggle 0.7s ease-in-out",
        backbottoggle: "backbottoggle 0.7s ease-in-out",
        chattile: "chattile 1s ease-in",
        fadeIn: "fadeIn .5s ease-in forwards",
      },
    },
  },
  plugins: [],
  safelist: [
    "animate-[fade-in_1s_ease-in-out]",
    "animate-[fade-in-down_1s_ease-in-out]",
  ],
  variants: {
    animation: ["motion-safe"],
  },
};
