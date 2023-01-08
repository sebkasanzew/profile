/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)'],
				serif: ['var(--font-lora)'],
			},
		},
	},
	plugins: [],
}

module.exports = tailwindConfig
