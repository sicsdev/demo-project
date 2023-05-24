/** @type {import('tailwindcss').Config} */
import color from "tailwindcss/colors"
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
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
      'neon':'#a3e635',
      'sky':'#60a5fa',
      'sky-2':'#0369a1',
    },
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      'home-gradient': "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
    },
  },
},
  plugins: [],
}
