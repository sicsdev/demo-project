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
      cyan: color.cyan[100]
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
