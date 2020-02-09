// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc, override, useEslintRc } = require('customize-cra');

module.exports = override(useBabelRc(), useEslintRc());
