const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "antd",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
};
