import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
	// Base JS recommendations
	js.configs.recommended,

	...nextVitals,
	...nextTs,

	// TypeScript recommended (type-checked + stylistic), scoped to TS files only
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					varsIgnorePattern: '^_',
				},
			],
		},
	},

	// Disable TS-specific unsafe rules on this JS config file
	{
		files: ['eslint.config.mjs'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
		},
	},

	// General project-wide rules not specific to TS
	{
		rules: {
			'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
			// With appDir we don't have pages dir-specific rule
			'@next/next/no-html-link-for-pages': 'off',
		},
	},

	// Global ignores: override defaults from eslint-config-next and add project-specific ones
	globalIgnores([
		// Defaults from eslint-config-next
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		// Project-specific
		'public/**',
		'**/.turbo/**',
		'**/playwright-report/**',
		'**/test-results/**',
		'**/$path.ts',
	]),

	// Node-specific globals for tool config files
	{
		files: ['postcss.config.js'],
		languageOptions: {
			globals: {
				module: 'readonly',
				require: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				exports: 'readonly',
				global: 'readonly',
			},
		},
	},

	// Prettier last to show formatting issues as ESLint warnings
	prettierRecommended,
])
