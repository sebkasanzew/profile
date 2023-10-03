/** @type {import('eslint').ESLint.ConfigData} */
const eslintConfig = {
	extends: [
		'plugin:@typescript-eslint/recommended',
		'next/core-web-vitals',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],

	rules: {
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }],

		// with appDir we do not have a pages directory
		'@next/next/no-html-link-for-pages': 'off',
	},
}

module.exports = eslintConfig
