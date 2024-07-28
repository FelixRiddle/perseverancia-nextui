import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{js,ts,jsx,tsx,mdx}",
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
	
	// So you do have to compile some packages, I couldn't do it before
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
