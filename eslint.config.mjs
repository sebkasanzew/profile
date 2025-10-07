// ESLint v9 flat config for this Next.js + TypeScript repo
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

// Use FlatCompat to consume eslint-config-next (legacy style)
const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const config = [
	// Ignore common output folders
	{
		ignores: [
			'node_modules',
			'**/.next',
			'out',
			'public',
			'**/.turbo',
			'**/playwright-report',
			'**/test-results',
			'**/$path.ts',
		],
	},

	// Base JS recommendations
	js.configs.recommended,

	// Next.js config via compat (core web vitals)
	...compat.config({ extends: ['next/core-web-vitals'] }),
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

	// TypeScript recommended (type-checked + stylistic), scoped to TS files only
	...tseslint.config({
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
	}),

	// Ignore triple-slash-reference rule in next-env.d.ts (Next.js generated file)
	{
		files: ['next-env.d.ts'],
		rules: {
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},

	// Prettier last to show formatting issues as ESLint warnings
	prettierRecommended,
]

export default config
