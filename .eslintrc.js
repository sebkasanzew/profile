/** @type {import('eslint').ESLint.ConfigData} */
const eslintConfig = {
	extends: ['next/core-web-vitals', 'prettier'],
	plugins: ['prettier'],

	rules: {
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }],

		// with appDir we do not have a pages directory
		'@next/next/no-html-link-for-pages': 'off',
	},
}

module.exports = eslintConfig
