module.exports = {
  extends: [
    "../../../../.eslintrc.js",
    "plugin:react/recommended"
  ],
  rules: {
    "import/extensions": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
