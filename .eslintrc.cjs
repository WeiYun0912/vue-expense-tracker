/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'vue/no-unused-components': 'error', // 检查未使用的组件
    'vue/no-undef-components': 'error' // 检查未定义的组件
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
