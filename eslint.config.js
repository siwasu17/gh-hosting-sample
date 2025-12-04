// eslint.config.js
import fs from 'node:fs'
import globals from 'globals'
import eslintJs from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'

const gitignore = fs.readFileSync('.gitignore', 'utf-8')
const ignorePatterns = gitignore
  .split('\n')
  .filter((line) => line.trim() !== '' && !line.startsWith('#'))

export default [
  // Global ignores
  {
    ignores: [...ignorePatterns, 'node_modules/'],
  },

  // JS files
  eslintJs.configs.recommended,

  // Vue files
  ...vuePlugin.configs['flat/recommended'],

  // Prettier config
  prettierConfig,

  // Project specific settings
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      // 'vue/vue3-recommended' is enabled, add/override custom rules here
      'vue/multi-word-component-names': 'off', // 'About.vue'などでエラーになるため
    },
  },
]
