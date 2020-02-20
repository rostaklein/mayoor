// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
	useBabelRc,
	override,
	useEslintRc,
	fixBabelImports,
	addLessLoader,
} = require('customize-cra');

module.exports = override(
	useBabelRc(),
	useEslintRc(),
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#2B95D6',
			'@success-color': '#32a345',
			'@warning-color': '#ca962c',
			'@error-color': '#b92b32',
			'@heading-color': 'rgba(0, 0, 0, 0.75)',
			'@text-color': 'rgba(0, 0, 0, 0.65)',
			'@border-radius-base': '2px',
		},
	}),
);
