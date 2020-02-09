module.exports = {
	printWidth: 100,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'always',
	proseWrap: 'always',
	quoteProps: 'consistent',

	overrides: [
		{
			files: '{.*.json,*.json,.*.y?(a)ml,*.y?(a)ml,*.md,.prettierrc,.stylelintrc,.babelrc}',
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
		{
			files: '*.md',
			options: {
				proseWrap: 'preserve',
			},
		},
	],
};
